import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  filePath: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Certificate', 'Internship', 'Project', 'Resume', 'Achievement', 'Academic', 'Other'],
    default: 'Other'
  },
  summary: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  academicYear: {
    type: Number,
    required: true,
    default: () => new Date().getFullYear()
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const Document = mongoose.model('Document', DocumentSchema);

export default Document;
