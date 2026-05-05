// src/pages/Finance/Finance.jsx
import React, { useState, useEffect } from "react";
import {
  academicsService,
  financeService,
  studentsService,
} from "../../../services";
import {
  PageHeader,
  StatsGrid,
  FinanceStatCard,
  StatValue,
  StatLabel,
  TabsContainer,
  Tab,
  InvoicesTable,
  TableHeader,
  InvoiceRow,
  StatusBadge,
  ActionButtons,
  EmptyState,
  FiltersBar,
  PaymentHistory,
  PaymentItem,
} from "./Finance.styles";
import {
  Heading1,
  Heading2,
  Button,
  IconButton,
  PageContainer,
  Select,
  FormGroup,
  Label,
  Input,
} from "../../common";
import { InvoiceModal } from "./InvoiceModal";
import RechargeModal from "./RechargeModal";
import { FaPen } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

const Finance = () => {
  const [invoices, setInvoices] = useState([]);
  const [students, setStudents] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [terms, setTerms] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    collectedAmount: 0,
    overdueAmount: 0,
  });
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchInvoices();
    fetchStudents();
    fetchFinanceStats();
    fetchAcademicYears();
    fetchTerm();
    console.log(stats);
    // Try to read school id from local storage user object
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) {
        setUser(user);
        setUserId(user.id);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const fetchTerm = async () => {
    try {
      const data = await academicsService.getTerms();
      setTerms(data);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      const data = await academicsService.getAcademicYears();
      setAcademicYears(data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }
  };

  const fetchWallet = async () => {
    if (!userId) return;
    try {
      setWalletLoading(true);
      const data = await financeService.getWalletStatus(userId);
      setWallet(data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    } finally {
      setWalletLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchWallet();
  }, [userId]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await financeService.getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await studentsService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchFinanceStats = async () => {
    try {
      const data = await financeService.getFeeReports();
      console.log(data);
      // Calculate stats from report data
      const totalRevenue = data.reduce(
        (sum, item) => sum + item.total_amount,
        0,
      );
      const collectedAmount = data.reduce(
        (sum, item) => sum + item.paid_amount,
        0,
      );
      const pendingAmount = data.reduce(
        (sum, item) => sum + item.pending_amount,
        0,
      );

      setStats({
        totalRevenue,
        collectedAmount,
        pendingAmount,
        overdueAmount: pendingAmount * 0.2, // Mock overdue calculation
      });
    } catch (error) {
      console.error("Error fetching finance stats:", error);
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (activeTab === "all") return true;
    return invoice.status === activeTab;
  });

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    if (user?.user_type !== "admin") {
      return;
    }
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleInvoiceSave = async (invoiceData) => {
    if (user?.user_type !== "admin") {
      return;
    }
    try {
      if (selectedInvoice) {
        // Update invoice logic
      } else {
        await financeService.createInvoice(invoiceData);
      }
      await fetchInvoices();
      await fetchFinanceStats();
      handleModalClose();
    } catch (error) {
      console.error("Error saving invoice:", error);
      throw error;
    }
  };

  const handleMarkAsPaid = async (invoiceId) => {
    if (user?.user_type !== "admin") {
      return;
    }
    try {
      // Mock payment - in real app, this would integrate with payment gateway
      await financeService.makePayment(invoiceId, {
        amount_paid:
          invoices.find((inv) => inv.id === invoiceId)?.total_amount || 0,
        payment_method: "manual",
      });
      await fetchInvoices();
      await fetchFinanceStats();
    } catch (error) {
      console.error("Error marking as paid:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <PageContainer>
      {user?.user_type === "admin" ? (
        <PageHeader>
          <div>
            <Heading1>Finance Management</Heading1>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              Manage student fees, invoices, and payments
            </p>
          </div>
          <>
            <Button variant="primary" onClick={handleCreateInvoice}>
              Create Invoice
            </Button>
            <Button
              style={{ marginLeft: 12 }}
              onClick={() => setIsRechargeOpen(true)}
            >
              Recharge Wallet
            </Button>
          </>
        </PageHeader>
      ) : (
        <PageHeader>
          <div>
            <Heading1>Finance Management</Heading1>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              Manage your fees here
            </p>
          </div>
          <>
            <Button variant="primary" onClick={handleCreateInvoice}>
              Pay
            </Button>
          </>
        </PageHeader>
      )}

      {wallet && (
        <div
          style={{
            backgroundColor: "#1a2b4c",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>Wallet Balance</h3>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  margin: "10px 0 0 0",
                }}
              >
                {wallet.credits} Credits
              </p>
            </div>
            <Button onClick={() => setIsRechargeOpen(true)}>
              + Add Credits
            </Button>
          </div>
        </div>
      )}

      {wallet && wallet.transactions && wallet.transactions.length > 0 && (
        <div
          style={{
            background: "#f9fafb",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ margin: "0 0 15px 0" }}>Recent Transactions</h4>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {wallet.transactions.map((tx) => (
              <div
                key={tx.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <div>
                  <p style={{ margin: "0 0 5px 0", fontWeight: "500" }}>
                    {tx.transaction_type === "credit"
                      ? "➕ Credit"
                      : "➖ Debit"}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                    {tx.description || "---"}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "0 0 5px 0", fontWeight: "600" }}>
                    {tx.transaction_type === "credit" ? "+" : "-"}
                    {tx.amount}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                    Balance: {tx.balance_after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <StatsGrid>
        <FinanceStatCard color="#10b981">
          <StatValue>{formatCurrency(stats.totalRevenue)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </FinanceStatCard>

        <FinanceStatCard color="#3b82f6">
          <StatValue>{formatCurrency(stats.collectedAmount)}</StatValue>
          <StatLabel>Collected</StatLabel>
        </FinanceStatCard>

        <FinanceStatCard color="#f59e0b">
          <StatValue>{formatCurrency(stats.pendingAmount)}</StatValue>
          <StatLabel>Pending</StatLabel>
        </FinanceStatCard>

        <FinanceStatCard color="#ef4444">
          <StatValue>{formatCurrency(stats.overdueAmount)}</StatValue>
          <StatLabel>Overdue</StatLabel>
        </FinanceStatCard>
      </StatsGrid>

      <TabsContainer>
        <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          All Invoices
        </Tab>
        <Tab
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </Tab>
        <Tab active={activeTab === "paid"} onClick={() => setActiveTab("paid")}>
          Paid
        </Tab>
        <Tab
          active={activeTab === "overdue"}
          onClick={() => setActiveTab("overdue")}
        >
          Overdue
        </Tab>
      </TabsContainer>

      <FiltersBar>
        <Input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />

        <FormGroup style={{ minWidth: "150px", margin: 0 }}>
          <Label>Status</Label>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </Select>
        </FormGroup>
      </FiltersBar>

      {loading ? (
        <EmptyState>Loading invoices...</EmptyState>
      ) : filteredInvoices.length === 0 ? (
        <EmptyState>
          <Heading2>No invoices found</Heading2>
          <p>Create your first invoice to get started.</p>
        </EmptyState>
      ) : (
        <InvoicesTable>
          <TableHeader>
            <div>Invoice #</div>
            <div>Student</div>
            <div>Amount</div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Actions</div>
          </TableHeader>

          {filteredInvoices.map((invoice) => (
            <InvoiceRow key={invoice.id}>
              <div>
                <strong>{invoice.invoice_number}</strong>
              </div>
              <div>
                <div style={{ fontWeight: "600" }}>{invoice.student_name}</div>
                <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                  {invoice.grade_name}
                </div>
              </div>
              <div>
                <strong>{formatCurrency(invoice.total_amount)}</strong>
                {invoice.paid_amount > 0 && (
                  <div style={{ fontSize: "0.875rem", color: "#10b981" }}>
                    Paid: {formatCurrency(invoice.paid_amount)}
                  </div>
                )}
              </div>
              <div>
                {formatDate(invoice.due_date)}
                {invoice.status === "overdue" && (
                  <div style={{ fontSize: "0.75rem", color: "#ef4444" }}>
                    Overdue
                  </div>
                )}
              </div>
              <div>
                <StatusBadge status={invoice.status}>
                  {invoice.status}
                </StatusBadge>
              </div>
              <ActionButtons>
                {user?.user_type === "admin" ? (
                  <IconButton
                    size="lg"
                    onClick={() => handleEditInvoice(invoice)}
                    title="Edit invoice"
                  >
                    <FaPen />
                  </IconButton>
                ) : (
                  ""
                )}
                <IconButton
                  size="lg"
                  onClick={() => {
                    /* View details */
                  }}
                  title="View details"
                >
                  <FaEye />
                </IconButton>
                {invoice.status === "pending" &&
                  (user?.user_type === "admin" ? (
                    <IconButton
                      size="lg"
                      onClick={() => handleMarkAsPaid(invoice.id)}
                      title="Mark as paid"
                    >
                      <IoCheckmark />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="lg"
                      onClick={() => handleMarkAsPaid(invoice.id)}
                      title="Pay"
                    >
                      <IoCheckmark />
                    </IconButton>
                  ))}
              </ActionButtons>
            </InvoiceRow>
          ))}
        </InvoicesTable>
      )}

      <InvoiceModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleInvoiceSave}
        invoice={selectedInvoice}
        students={students}
        academicYears={academicYears}
        terms={terms}
      />
      <RechargeModal
        isOpen={isRechargeOpen}
        onClose={() => setIsRechargeOpen(false)}
        userId={userId}
        onSuccess={(data) => console.log("pay init", data)}
      />
    </PageContainer>
  );
};

export default Finance;
