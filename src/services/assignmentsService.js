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
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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

  // Student Assignments / Submissions
  async getAssignmentSubmissions(assignmentId) {
    try {
      const response = await api.get(
        `/assignments/assignments/${assignmentId}/submissions/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStudentSubmission(assignmentId) {
    try {
      const response = await api.get(
        `/assignments/assignments/${assignmentId}/submit/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async submitAssignment(assignmentId, submissionData) {
    try {
      // submissionData should be FormData for file uploads
      const response = await api.post(
        `/assignments/assignments/${assignmentId}/submit/`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Grading
  async getSubmissionGrade(studentAssignmentId) {
    try {
      const response = await api.get(
        `/assignments/student-assignments/${studentAssignmentId}/grade/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

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
