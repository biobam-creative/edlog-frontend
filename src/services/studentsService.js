// src/services/studentsService.js
import api from "./api12";

class StudentsService {
  // Students
  async getStudents(filters = {}) {
    try {
      const response = await api.get("/students/students/", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStudentById(studentId) {
    try {
      const response = await api.get(`/students/students/${studentId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStudentByUserId(UserID) {
    try {
      const response = await api.get(`/students/students/by_id/${UserID}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createStudent(studentData) {
    try {
      const response = await api.post("/students/students/", studentData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateStudent(studentId, studentData) {
    try {
      const response = await api.put(
        `/students/students/${studentId}/`,
        studentData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteStudent(studentId) {
    try {
      const response = await api.delete(`/students/students/${studentId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bulkCreateStudents(studentsData) {
    try {
      const response = await api.post(
        "/students/students/bulk-create/",
        studentsData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async renewSubscription(studentId, termId) {
    try {
      const response = await api.post(
        `/students/students/${studentId}/renew/`,
        { term_id: termId },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bulkRenewSubscriptions(payload) {
    try {
      const response = await api.post(`/students/bulk-subscribe/`, payload);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Parents
  async getParents() {
    try {
      const response = await api.get("/students/parents/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getParentWards() {
    try {
      const response = await api.get(`/students/students/parent_students/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createParent(parentData) {
    try {
      const response = await api.post("/students/parents/", parentData);
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

export default new StudentsService();
