// src/services/dashboardService.js
import api from "./api12";

class DashboardService {
  // Dashboard statistics
  async getDashboardStats() {
    try {
      const response = await api.get("/dashboard/stats/");
      return response.data;
    } catch (error) {
      console.log(error);
      throw this.handleError(error);
    }
  }

  // Global search
  async globalSearch(query) {
    try {
      const response = await api.get("/dashboard/search/", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // File upload
  async uploadFile(file, onUploadProgress = null) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (onUploadProgress) {
        config.onUploadProgress = onUploadProgress;
      }

      const response = await api.post("/upload/", formData, config);
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

export default new DashboardService();
