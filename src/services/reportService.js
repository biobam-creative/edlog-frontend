import api from "./api12";

class ScoreService {
  async getClassSubjectScores(filters = {}) {
    try {
      const response = await api.get("/reports/class_subject_scores/", {
        params: filters,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  async getSubjectReports(filters = {}) {
    try {
      const response = await api.get("/reports/subject_score/", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getScoreById(scoreId) {
    try {
      const response = await api.get(`/reports/reports/${scoreId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createScore(schoolData) {
    try {
      const response = await api.post("/reports/subject_score/", schoolData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateScore(scoreId, scoreData) {
    try {
      const response = await api.put(
        `/reports/subject_score/${scoreId}/`,
        scoreData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteScore(scoreId) {
    try {
      const response = await api.delete(`/reports/subject_score/${scoreId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bulkCreateScores(studentsData) {
    try {
      const response = await api.post("/reports/bulk_score/", studentsData);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bulkReportCardGeneration(grade, term) {
    try {
      const response = await api.get(
        `/reports/bulk_report_pdf/${grade}/${term}/`,
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchReportCard(studentId, term) {
    try {
      const response = await api.get(`/reports/report/${studentId}/${term}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyResult(id) {
    try {
      const response = await api.get(`/reports/verify/${id}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async fetchReportCardStaffView(studentId, term) {
    try {
      const response = await api.get(
        `/reports/report/staff_view/${studentId}/${term}/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateOrCreateReport(studentId, term, performanceData) {
    console.log(performanceData);
    try {
      // use PATCH for partial updates (frontend sends partial performance object)
      const response = await api.patch(
        `/reports/performance/create/${studentId}/${term}/`,
        performanceData,
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

export default new ScoreService();
