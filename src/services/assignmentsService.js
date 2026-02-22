// src/services/assignmentsService.js
import api from "./api12";

class AssignmentsService {
  // Assignments
  async getAssignments(filters = {}) {
    try {
      const response = await api.get("/assignments/assignments/", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAssignmentById(assignmentId) {
    try {
      const response = await api.get(
        `/assignments/assignments/${assignmentId}/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createAssignment(assignmentData) {
    try {
      const response = await api.post(
        "/assignments/assignments/",
        assignmentData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateAssignment(assignmentId, assignmentData) {
    try {
      const response = await api.put(
        `/assignments/assignments/${assignmentId}/`,
        assignmentData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteAssignment(assignmentId) {
    try {
      const response = await api.delete(
        `/assignments/assignments/${assignmentId}/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Student Assignments
  async getStudentAssignments(assignmentId) {
    try {
      const response = await api.get(
        `/assignments/assignments/${assignmentId}/submissions/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async submitAssignment(assignmentId, submissionData) {
    try {
      const response = await api.post(
        `/assignments/assignments/${assignmentId}/submissions/`,
        submissionData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Grading
  async gradeAssignment(studentAssignmentId, gradeData) {
    try {
      const response = await api.post(
        `/assignments/student-assignments/${studentAssignmentId}/grade/`,
        gradeData,
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

export default new AssignmentsService();
