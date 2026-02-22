// src/services/financeService.js
import api from "./api12";

class FinanceService {
  // Fee Structures
  async getFeeStructures() {
    try {
      const response = await api.get("/finance/fee-structures/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createFeeStructure(feeStructureData) {
    try {
      const response = await api.post(
        "/finance/fee-structures/",
        feeStructureData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Invoices
  async getInvoices(filters = {}) {
    try {
      const response = await api.get("/finance/invoices/", { params: filters });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getInvoiceById(invoiceId) {
    try {
      const response = await api.get(`/finance/invoices/${invoiceId}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createInvoice(invoiceData) {
    try {
      const response = await api.post("/finance/invoices/", invoiceData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Payments
  async makePayment(invoiceId, paymentData) {
    try {
      const response = await api.post(
        `/finance/invoices/${invoiceId}/pay/`,
        paymentData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPaymentHistory(invoiceId) {
    try {
      const response = await api.get(
        `/finance/invoices/${invoiceId}/payments/`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reports
  async getFeeReports() {
    try {
      const response = await api.get("/finance/fee-reports/");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Wallet / Paystack
  async initiateWalletPurchase(schoolId, payload) {
    try {
      const response = await api.post(
        `/finance/paystack/schools/${schoolId}/initiate/`,
        payload,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyWalletPurchase(reference) {
    try {
      const response = await api.get(`/finance/paystack/verify/${reference}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getWalletStatus(userId) {
    try {
      const response = await api.get(`/finance/schools/${userId}/wallet/`);
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

export default new FinanceService();
