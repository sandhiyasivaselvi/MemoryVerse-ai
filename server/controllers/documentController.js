import fs from 'fs';
import path from 'path';
import Document from '../models/Document.js';
import { analyzeDocument } from '../services/aiService.js';

// Upload and analyze document
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded.' });
    }

    const { originalname, path: filePath, mimetype } = req.file;

    // Run AI analysis
    const aiResults = await analyzeDocument(filePath, mimetype, originalname);

    // Save to database
    const document = new Document({
      fileName: originalname,
      filePath: filePath.replace(/\\/g, '/'), // Standardize to forward slashes
      mimeType: mimetype,
      category: aiResults.category,
      summary: aiResults.summary,
      skills: aiResults.skills,
      academicYear: aiResults.academicYear
    });

    const savedDoc = await document.save();

    res.status(201).json({
      success: true,
      message: 'Document uploaded and analyzed successfully.',
      data: savedDoc
    });
  } catch (error) {
    console.error('Error in uploadDocument:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process document upload.',
      details: error.message
    });
  }
};

// Retrieve documents (with optional natural text search)
export const getDocuments = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim() !== '') {
      const searchTerms = search.trim().split(/\s+/).map(term => term.trim()).filter(term => term !== '');
      
      // If we have search terms, perform an OR query across fields
      if (searchTerms.length > 0) {
        query.$or = searchTerms.flatMap(term => {
          const regex = new RegExp(term, 'i');
          return [
            { fileName: regex },
            { category: regex },
            { summary: regex },
            { skills: { $in: [regex] } }
          ];
        });
      }
    }

    const documents = await Document.find(query).sort({ uploadDate: -1 });

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    console.error('Error in getDocuments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve documents.',
      details: error.message
    });
  }
};

// Retrieve document by ID
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, error: 'Document not found.' });
    }

    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Error in getDocumentById:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve document details.',
      details: error.message
    });
  }
};

// Delete a document (file system + database)
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, error: 'Document not found.' });
    }

    // Delete local file if it exists
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    } else {
      console.warn(`File not found on disk: ${document.filePath}`);
    }

    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Document deleted successfully.'
    });
  } catch (error) {
    console.error('Error in deleteDocument:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete document.',
      details: error.message
    });
  }
};

// Retrieve aggregated stats for Dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const totalDocs = await Document.countDocuments();
    
    // Group counts by category
    const categoryGroup = await Document.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Build categories statistics map
    const categories = {
      Certificate: 0,
      Internship: 0,
      Project: 0,
      Resume: 0,
      Achievement: 0,
      Academic: 0,
      Other: 0
    };

    categoryGroup.forEach(item => {
      if (categories[item._id] !== undefined) {
        categories[item._id] = item.count;
      }
    });

    // Extract all unique skills and compute their occurrences
    const allDocs = await Document.find({}, 'skills');
    const skillCounts = {};
    allDocs.forEach(doc => {
      doc.skills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });

    // Sort skills by frequency and take top 12
    const topSkills = Object.entries(skillCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);

    // Get 5 most recent files
    const recentFiles = await Document.find()
      .sort({ uploadDate: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalDocuments: totalDocs,
        categoryBreakdown: categories,
        topSkills,
        recentFiles
      }
    });
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve dashboard stats.',
      details: error.message
    });
  }
};
