import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

// A vocabulary of common skills for offline extraction fallback
const SKILL_VOCABULARY = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C\\+\\+', 'HTML', 'CSS', 'React',
  'Node\\.js', 'Express', 'MongoDB', 'SQL', 'PostgreSQL', 'Machine Learning',
  'Artificial Intelligence', 'AI', 'ML', 'Data Science', 'Docker', 'Kubernetes',
  'AWS', 'Git', 'GitHub', 'Tailwind', 'Redux', 'Vue', 'Angular', 'Next\\.js',
  'Flask', 'Django', 'Spring Boot', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Figma'
];

// Helper to convert local file to Gemini generative part
const fileToGenerativePart = (filePath, mimeType) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
};

export const analyzeDocument = async (filePath, mimeType, originalName) => {
  let extractedText = '';
  let isImage = mimeType.startsWith('image/');

  // 1. Extract text if it is PDF or DOCX
  try {
    if (mimeType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      extractedText = pdfData.text;
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    }
  } catch (err) {
    console.error('Error extracting text from file:', err.message);
    // Fallback to empty text, we will use filename and basic details
  }

  // 2. Check if GEMINI_API_KEY is available
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.trim() !== '') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      let contents = [];
      let prompt = `
        You are an AI assistant designed to help students organize their academic and professional portfolio.
        Analyze the following student document (which may be provided as text or as an image).
        
        Extract the following:
        1. **Category**: Classify this document into exactly one of: "Certificate", "Internship", "Project", "Resume", "Achievement", "Academic", "Other".
        2. **Summary**: Provide a clear, professional 2-3 sentence summary of the document contents.
        3. **Skills**: Extract a list of up to 10 technical or professional skills mentioned in the document (e.g., "Python", "React", "Project Management").
        4. **Academic Year**: Extract the academic or calendar year associated with this document (e.g. 2024). Look for graduation year, completion date, issue date, or project date. If no year is found, use the current year ${new Date().getFullYear()}.

        Your response must be a JSON object matching this schema:
        {
          "category": "Certificate | Internship | Project | Resume | Achievement | Academic | Other",
          "summary": "Summary text...",
          "skills": ["Skill1", "Skill2"],
          "academicYear": 2025
        }
      `;

      if (isImage) {
        const imagePart = fileToGenerativePart(filePath, mimeType);
        contents = [prompt, imagePart];
      } else {
        contents = [prompt, `Document content:\n${extractedText || originalName}`];
      }

      const response = await model.generateContent({
        contents: contents,
        generationConfig: {
          responseMimeType: 'application/json',
        }
      });

      const jsonText = response.response.text();
      return JSON.parse(jsonText);
    } catch (apiError) {
      console.warn('Gemini API Error, falling back to offline analysis:', apiError.message);
      // Fall through to offline analyzer
    }
  }

  // 3. Offline fallback analysis
  console.log('Running offline fallback analyzer...');
  return runOfflineAnalyzer(extractedText || originalName, originalName);
};

const runOfflineAnalyzer = (text, originalName) => {
  const contentToAnalyze = (text + ' ' + originalName).toLowerCase();
  
  // Categorization
  let category = 'Other';
  if (contentToAnalyze.includes('resume') || contentToAnalyze.includes('cv') || contentToAnalyze.includes('curriculum vitae')) {
    category = 'Resume';
  } else if (contentToAnalyze.includes('internship') || contentToAnalyze.includes('intern') || contentToAnalyze.includes('experience letter') || contentToAnalyze.includes('work certificate')) {
    category = 'Internship';
  } else if (contentToAnalyze.includes('project') || contentToAnalyze.includes('github') || contentToAnalyze.includes('application') || contentToAnalyze.includes('system') || contentToAnalyze.includes('source code')) {
    category = 'Project';
  } else if (contentToAnalyze.includes('certificate') || contentToAnalyze.includes('certification') || contentToAnalyze.includes('course') || contentToAnalyze.includes('certified') || contentToAnalyze.includes('credential')) {
    category = 'Certificate';
  } else if (contentToAnalyze.includes('award') || contentToAnalyze.includes('win') || contentToAnalyze.includes('won') || contentToAnalyze.includes('hackathon') || contentToAnalyze.includes('first place') || contentToAnalyze.includes('achievement')) {
    category = 'Achievement';
  } else if (contentToAnalyze.includes('academic') || contentToAnalyze.includes('transcript') || contentToAnalyze.includes('grade') || contentToAnalyze.includes('semester') || contentToAnalyze.includes('exam') || contentToAnalyze.includes('gpa') || contentToAnalyze.includes('mark')) {
    category = 'Academic';
  }

  // Skill extraction using regex vocabulary
  const skills = [];
  SKILL_VOCABULARY.forEach(skillPattern => {
    const regex = new RegExp(`\\b${skillPattern}\\b`, 'i');
    if (regex.test(contentToAnalyze)) {
      // Clean up regex escape characters for presentation
      const cleanSkill = skillPattern.replace('\\.', '.').replace('\\+', '+');
      if (!skills.includes(cleanSkill)) {
        skills.push(cleanSkill);
      }
    }
  });

  // Extract year (scan for 4-digit numbers starting with 20)
  let academicYear = new Date().getFullYear();
  const yearMatches = contentToAnalyze.match(/\b20\d{2}\b/g);
  if (yearMatches) {
    const years = yearMatches.map(y => parseInt(y)).filter(y => y <= academicYear + 2);
    if (years.length > 0) {
      academicYear = Math.max(...years);
    }
  }

  // Summary generation
  let summary = `A ${category.toLowerCase()} document uploaded as "${originalName}". `;
  if (skills.length > 0) {
    summary += `Analyzed offline, extracting skills like ${skills.join(', ')}. `;
  } else {
    summary += `Processed offline via local rule-based parsing. `;
  }
  summary += `Associated with academic year ${academicYear}.`;

  return {
    category,
    summary,
    skills: skills.length > 0 ? skills : ['General Development'],
    academicYear
  };
};
