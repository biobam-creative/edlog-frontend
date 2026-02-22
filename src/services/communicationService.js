// src/services/communicationService.js
import api from "./api12";

class CommunicationService {
  // Announcements
  async getAnnouncements() {
    try {
      const response = await api.get("/communication/announcements/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createAnnouncement(announcementData) {
    try {
      const response = await api.post(
        "/communication/announcements/",
        announcementData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteAnnouncement(announcementId) {
    try {
      const response = await api.delete(
        `/communication/announcements/${announcementId}/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Messages
  async getInbox() {
    try {
      const response = await api.get("/communication/inbox/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendMessage(messageData) {
    try {
      const response = await api.post("/communication/messages/", messageData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async markMessageAsRead(messageId) {
    try {
      const response = await api.put(
        `/communication/messages/${messageId}/read/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteMessage(messageId) {
    try {
      const response = await api.delete(
        `/communication/messages/${messageId}/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return { error: "Network error occurred" };
  }
}

export default new CommunicationService();
