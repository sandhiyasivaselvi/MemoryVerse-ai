import express from 'express';
import upload from '../middleware/upload.js';
import {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
  getDashboardStats
} from '../controllers/documentController.js';

const router = express.Router();

// Route for getting overall dashboard stats
router.get('/stats', getDashboardStats);

// Route for uploading a document (using upload middleware)
router.post('/upload', upload.single('file'), uploadDocument);

// Route for listing all documents or searching them
router.get('/', getDocuments);

// Route for retrieving a specific document
router.get('/:id', getDocumentById);

// Route for deleting a document
router.delete('/:id', deleteDocument);

export default router;
