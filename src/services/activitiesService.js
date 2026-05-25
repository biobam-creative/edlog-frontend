import { api } from './api';

export const activitiesService = {
  /**
   * Get recent activities for dashboard
   * @param {number} limit - Number of activities to return (default: 20, max: 100)
   * @param {string} activityType - Filter by activity type (optional)
   * @param {string} userType - Filter by actor user type (optional)
   * @returns {Promise}
   */
  getRecentActivities: (limit = 20, activityType = null, userType = null) => {
    const params = { limit };
    if (activityType) params.activity_type = activityType;
    if (userType) params.user_type = userType;
    
    return api.get('/activities/activities/recent/', { params });
  },

  /**
   * Get activities performed by the current user
   * @param {number} limit - Number of activities to return
   * @returns {Promise}
   */
  getMyActivities: (limit = 20) => {
    return api.get('/activities/activities/my-activities/', { params: { limit } });
  },

  /**
   * Get activities affecting the current user
   * @param {number} limit - Number of activities to return
   * @returns {Promise}
   */
  getAffectingMe: (limit = 20) => {
    return api.get('/activities/activities/affecting-me/', { params: { limit } });
  },

  /**
   * Get activity statistics
   * @returns {Promise}
   */
  getStatistics: () => {
    return api.get('/activities/activities/statistics/');
  },

  /**
   * Get activities in timeline format
   * @param {number} limit - Number of activities to return
   * @returns {Promise}
   */
  getTimeline: (limit = 50) => {
    return api.get('/activities/activities/timeline/', { params: { limit } });
  },

  /**
   * Get specific activity details
   * @param {number} id - Activity ID
   * @returns {Promise}
   */
  getActivity: (id) => {
    return api.get(`/activities/activities/${id}/`);
  },

  /**
   * List all activities (admin only)
   * @returns {Promise}
   */
  listActivities: (params = {}) => {
    return api.get('/activities/activities/', { params });
  },
};
