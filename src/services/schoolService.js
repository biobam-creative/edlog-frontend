import api from "./api12";

class SchoolService {
  async getSchools(filters = {}) {
    try {
      const response = await api.get("/schools/schools/", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getSchoolById(schoolId) {
    try {
      const response = await api.get(`/schools/schools/${schoolId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createSchool(schoolData) {
    try {
      const response = await api.post("/schools/schools/", schoolData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateSchool(schoolId, schoolData) {
    try {
      const response = await api.put(
        `/schools/schools/${schoolId}/`,
        schoolData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteSchool(schoolId) {
    try {
      const response = await api.delete(`/schools/schools/${schoolId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async bulkCreateSchools(studentsData) {
    try {
      const response = await api.post(
        "/schools/schools/bulk-create/",
        studentsData,
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

export default new SchoolService();
