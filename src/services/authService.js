// src/services/authService.js
import axios from "axios";
import api from "./api12";

class AuthService {
  // Get CSRF token
  async getCSRFToken() {
    try {
      const response = await api.get("/auth/csrf/");
      console.log("CSRF Token:", response);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(credentials) {
    return await api.post(`/auth/login/`, credentials);
    // try {
    //   // First get CSRF token
    //   // await this.getCSRFToken();
    //   // console.log("CSRF token obtained successfully.");
    //   return await api.post(
    //     `/auth/login/`,
    //     credentials,
    //   ).then((response)=>{
    //     console.log(response)
    //     if (response.data){
    //       localStorage.setItem("access_token", response.data.access);
    //       localStorage.setItem("refresh_token", response.data.refresh);
    //       localStorage.setItem("user", JSON.stringify(response.data.user));
    //       return response.data;
    //     }
    //     return response.data;
    //   });
    // } catch (error) {
    //   throw this.handleError(error);
    // }
  }

  // Logout user
  async logout() {
    try {
      const response = await api.post("/auth/logout/");
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      return response.data;
    } catch (error) {
      // Clear local storage even if API call fails
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      throw this.handleError(error);
    }
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get("/auth/profile/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put("/auth/profile/", userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.post("/auth/change-password/", passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Request password reset
  async requestPasswordReset(data) {
    try {
      const response = await api.post("/auth/password-reset-request/", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset password with token
  async resetPassword(data) {
    try {
      const response = await api.post("/auth/password-reset-confirm/", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Validate reset token
  async validateResetToken(token) {
    try {
      const response = await api.post("/auth/password-reset-validate/", {
        token,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all users (admin only)
  async getUsers() {
    try {
      const response = await api.get("/auth/users/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user by ID (admin only)
  async getUserById(userId) {
    try {
      const response = await api.get(`/auth/users/${userId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user (admin only)
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/auth/users/${userId}/`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete user (admin only)
  async deleteUser(userId) {
    try {
      const response = await api.delete(`/auth/users/${userId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  handleError(error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return { error: "Network error occurred" };
  }
}

export default new AuthService();
