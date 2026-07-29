import api from './api';

const documentService = {
  // Upload a document with multipart form-data and track upload progress
  uploadDocument: (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },

  // Get all documents or search by keyword
  getDocuments: (search = '') => {
    const params = search ? { search } : {};
    return api.get('/documents', { params });
  },

  // Get a single document details by ID
  getDocumentById: (id) => {
    return api.get(`/documents/${id}`);
  },

  // Delete a document by ID
  deleteDocument: (id) => {
    return api.delete(`/documents/${id}`);
  },

  // Fetch compiled statistics for the Dashboard page
  getDashboardStats: () => {
    return api.get('/documents/stats');
  }
};

export default documentService;
