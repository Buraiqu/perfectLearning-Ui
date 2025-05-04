/**
 * PDF Service
 * Handles PDF document operations including fetching, uploading, and annotations
 */

import BaseService from './BaseService';

class PDFService extends BaseService {
  constructor() {
    super('/documents');
  }

  /**
   * Get a list of PDF documents
   * @param {Object} params - Query parameters (pagination, filters)
   * @returns {Promise} Promise resolving to PDF documents list
   */
  async getDocuments(params = {}) {
    return this.get('', params);
  }

  /**
   * Get a specific PDF document by ID
   * @param {string} documentId - Document ID
   * @returns {Promise} Promise resolving to PDF document data
   */
  async getDocument(documentId) {
    return this.get(`/${documentId}`);
  }

  /**
   * Upload a new PDF document
   * @param {File} file - PDF file to upload
   * @param {Object} metadata - Document metadata
   * @returns {Promise} Promise resolving to uploaded document data
   */
  async uploadDocument(file, metadata = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add metadata fields to form data
    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    return this.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Update document metadata
   * @param {string} documentId - Document ID
   * @param {Object} metadata - Updated metadata
   * @returns {Promise} Promise resolving to updated document data
   */
  async updateDocumentMetadata(documentId, metadata) {
    return this.put(`/${documentId}`, metadata);
  }

  /**
   * Delete a document
   * @param {string} documentId - Document ID
   * @returns {Promise} Promise resolving to deletion response
   */
  async deleteDocument(documentId) {
    return this.delete(`/${documentId}`);
  }

  /**
   * Get document annotations
   * @param {string} documentId - Document ID
   * @returns {Promise} Promise resolving to annotations data
   */
  async getAnnotations(documentId) {
    return this.get(`/${documentId}/annotations`);
  }

  /**
   * Save document annotations
   * @param {string} documentId - Document ID
   * @param {Array} annotations - Annotations data
   * @returns {Promise} Promise resolving to saved annotations data
   */
  async saveAnnotations(documentId, annotations) {
    return this.post(`/${documentId}/annotations`, { annotations });
  }

  /**
   * Share document with other users
   * @param {string} documentId - Document ID
   * @param {Array} userIds - Array of user IDs to share with
   * @param {string} permission - Permission level (e.g., 'view', 'edit')
   * @returns {Promise} Promise resolving to sharing response
   */
  async shareDocument(documentId, userIds, permission = 'view') {
    return this.post(`/${documentId}/share`, { userIds, permission });
  }
}

// Create and export a singleton instance
const pdfService = new PDFService();
export default pdfService;
