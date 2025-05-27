// src/api/services/PublicContentService.js
import PublicBaseService from './PublicBaseService';

class PublicContentService extends PublicBaseService {

  constructor() {
    super('/api');
  }

  async getCourseCategoryCount(payload) {
    return this.post('/GetCourseCategoryCount', payload);
  }

  async getCourseListForApplication(payload) {
    return this.post('/GetCourseListForFEApplication', payload);
  }

  async getCourseDetailsForEnroll(payload) {
    return this.post('/GetCourseForEnroll', payload);
  }

  async getCourseUpdatesAndNotifications(payload) {
    return this.post('/GetCourseNotidicationSubscriptionCheck', payload);
  }
  async getCoursePlanDetailsAndFeatures(payload) {
    return this.post('/GetCoursePlanForEnrollAndFeature', payload);
  }

}

const publicContentService = new PublicContentService();
export { publicContentService };
export default publicContentService;