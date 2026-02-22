// src/services/academicsService.js
import api from "./api12";

class AcademicsService {
  // Academic Years
  async getAcademicYears() {
    try {
      const response = await api.get("/academics/academic-years/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createAcademicYear(academicYearData) {
    try {
      const response = await api.post(
        "/academics/academic-years/",
        academicYearData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Grades/Classes
  async getGrades() {
    try {
      const response = await api.get("/academics/grades/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getGradeById(gradeId) {
    try {
      const response = await api.get(`/academics/grades/${gradeId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createGrade(gradeData) {
    try {
      const response = await api.post("/academics/grades/", gradeData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateGrade(gradeId, gradeData) {
    try {
      const response = await api.put(
        `/academics/grades/${gradeId}/`,
        gradeData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteGrade(gradeId) {
    try {
      const response = await api.delete(`/academics/grades/${gradeId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Subjects
  async getSubjects() {
    try {
      const response = await api.get("/academics/subjects/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createSubject(subjectData) {
    try {
      const response = await api.post("/academics/subjects/", subjectData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Timetables
  async getTimetables(gradeId = null) {
    try {
      const params = gradeId ? { grade_id: gradeId } : {};
      const response = await api.get("/academics/timetables/", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createTimetable(timetableData) {
    try {
      const response = await api.post("/academics/timetables/", timetableData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createBulkTimetable(timetablesData) {
    try {
      const response = await api.post(
        "/academics/timetables/bulk/",
        timetablesData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Terms
  async getTerms() {
    try {
      const response = await api.get("/academics/terms/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createTerm(termData) {
    try {
      const response = await api.post("/academics/terms/", termData);
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

export default new AcademicsService();
