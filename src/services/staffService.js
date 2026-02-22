// src/services/staffService.js
import api from "./api12";

class StaffService {
  // Teachers
  async getTeachers() {
    try {
      const response = await api.get("/staff/teachers/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getTeacherById(teacherId) {
    try {
      const response = await api.get(`/staff/teachers/${teacherId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createTeacher(teacherData) {
    try {
      const response = await api.post("/staff/teachers/", teacherData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateTeacher(teacherId, teacherData) {
    try {
      const response = await api.put(
        `/staff/teachers/${teacherId}/`,
        teacherData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Staff members
  async getStaff() {
    try {
      const response = await api.get("/staff/staff/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createStaff(staffData) {
    try {
      const response = await api.post("/staff/staff/", staffData);
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

export default new StaffService();
