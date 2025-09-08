// src/api/services/PublicContentService.js
import PublicBaseService from './PublicBaseService';

class PublicContentService extends PublicBaseService {

  constructor() {
    super('/api');
  }

  async getCourseCategoryCount(payload) {
    return this.post('/FEGetCourseCategoryCount', payload);
  }

  async getCourseListForApplication(payload) {
    return this.post('/FEGetCourseList', payload);
  }

  async getCourseDetailsForEnroll(payload) {
    return this.post('/FEGetCourseForEnroll', payload);
  }

  async getCourseUpdatesAndNotifications(payload) {
    return this.post('/FEGetCourseNotificationSubscriptionCheck', payload);
  }
  async getCoursePlanDetailsAndFeatures(payload) {
    return this.post('/FEGetCoursePlanAndFeaturesForEnroll', payload);
  }

}

const publicContentService = new PublicContentService();
export { publicContentService };
export default publicContentService;