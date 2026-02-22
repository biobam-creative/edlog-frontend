// src/services/attendanceService.js
import api from "./api12";

class AttendanceService {
  // Student Attendance
  async getStudentAttendance(filters = {}) {
    try {
      const response = await api.get("/attendance/student-attendance/", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async markStudentAttendance(attendanceData) {
    try {
      const response = await api.post(
        "/attendance/student-attendance/",
        attendanceData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async markBulkStudentAttendance(bulkData) {
    try {
      const response = await api.post(
        "/attendance/student-attendance/bulk/",
        bulkData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Attendance Reports
  async getAttendanceReport(filters = {}) {
    try {
      const response = await api.get("/attendance/attendance-report/", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Staff Attendance
  async getStaffAttendance(filters = {}) {
    try {
      const response = await api.get("/attendance/staff-attendance/", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async markStaffAttendance(attendanceData) {
    try {
      const response = await api.post(
        "/attendance/staff-attendance/",
        attendanceData,
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

export default new AttendanceService();
