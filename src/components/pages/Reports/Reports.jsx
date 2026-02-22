// src/pages/Reports/Reports.jsx
import React, { useState, useEffect } from "react";
import { academicsService } from "../../../services";
import {
  PageHeader,
  ReportsGrid,
  ReportCard,
  ReportIcon,
  ReportTitle,
  ReportDescription,
  FiltersSection,
  FilterRow,
  ReportPreview,
  ChartContainer,
  DataTable,
  TableHeader,
  TableCell,
  ExportOptions,
  EmptyState,
} from "./Reports.styles";
import {
  Heading1,
  Heading2,
  Button,
  PageContainer,
  Select,
  FormGroup,
  Label,
  DateInput,
} from "../../common";

// Mock chart component - in real app, use Chart.js or similar
const MockChart = ({ title, data }) => (
  <div
    style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      height: "100%",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "1.2rem",
      fontWeight: "600",
    }}
  >
    {title} Chart
  </div>
);

const Reports = () => {
  const [grades, setGrades] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    grade: "",
    reportType: "",
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const data = await academicsService.getGrades();
      setGrades(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const reportTypes = [
    {
      id: "attendance",
      title: "Attendance Report",
      description: "View student attendance patterns and trends",
      icon: "✅",
      color: "#10b981",
    },
    {
      id: "academic",
      title: "Academic Performance",
      description: "Analyze student grades and academic progress",
      icon: "📊",
      color: "#3b82f6",
    },
    {
      id: "finance",
      title: "Financial Report",
      description: "Track fee collection and financial overview",
      icon: "💳",
      color: "#f59e0b",
    },
    {
      id: "behavior",
      title: "Behavior & Discipline",
      description: "Monitor student behavior and disciplinary actions",
      icon: "📝",
      color: "#ef4444",
    },
    {
      id: "teacher",
      title: "Teacher Performance",
      description: "Evaluate teacher effectiveness and workload",
      icon: "👨‍🏫",
      color: "#8b5cf6",
    },
    {
      id: "inventory",
      title: "Inventory Report",
      description: "Track school assets and resource utilization",
      icon: "📦",
      color: "#06b6d4",
    },
  ];

  const handleReportSelect = (report) => {
    setSelectedReport(report);
    setFilters((prev) => ({
      ...prev,
      reportType: report.id,
    }));
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateReport = async () => {
    if (!selectedReport) return;

    setLoading(true);
    try {
      // Mock report data - in real app, this would come from your API
      const mockData = {
        summary: {
          totalStudents: 150,
          averageAttendance: 92.5,
          totalRevenue: 45000,
          outstandingFees: 8500,
        },
        chartData: [
          { month: "Jan", value: 85 },
          { month: "Feb", value: 92 },
          { month: "Mar", value: 88 },
          { month: "Apr", value: 95 },
          { month: "May", value: 90 },
          { month: "Jun", value: 93 },
        ],
        tableData: [
          { student: "John Doe", grade: "A", attendance: "95%", fees: "Paid" },
          {
            student: "Jane Smith",
            grade: "B+",
            attendance: "88%",
            fees: "Pending",
          },
          {
            student: "Mike Johnson",
            grade: "A-",
            attendance: "92%",
            fees: "Paid",
          },
          {
            student: "Sarah Wilson",
            grade: "B",
            attendance: "85%",
            fees: "Overdue",
          },
        ],
      };

      setReportData(mockData);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = (format) => {
    // Mock export functionality
    alert(`Exporting ${selectedReport?.title} as ${format.toUpperCase()}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <Heading1>Reports & Analytics</Heading1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Generate comprehensive reports and insights
          </p>
        </div>
      </PageHeader>

      {!selectedReport ? (
        <ReportsGrid>
          {reportTypes.map((report) => (
            <ReportCard
              key={report.id}
              onClick={() => handleReportSelect(report)}
            >
              <ReportIcon color={report.color}>{report.icon}</ReportIcon>
              <ReportTitle>{report.title}</ReportTitle>
              <ReportDescription>{report.description}</ReportDescription>
              <Button variant="secondary" size="sm">
                Generate Report
              </Button>
            </ReportCard>
          ))}
        </ReportsGrid>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <div>
              <Heading2>{selectedReport.title}</Heading2>
              <p style={{ color: "#64748b" }}>{selectedReport.description}</p>
            </div>
            <Button variant="secondary" onClick={() => setSelectedReport(null)}>
              Back to Reports
            </Button>
          </div>

          <FiltersSection>
            <Heading2 style={{ marginBottom: "1.5rem" }}>
              Report Filters
            </Heading2>
            <FilterRow>
              <FormGroup>
                <Label>Start Date</Label>
                <DateInput
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>End Date</Label>
                <DateInput
                  value={filters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Grade/Class</Label>
                <Select
                  value={filters.grade}
                  onChange={(e) => handleFilterChange("grade", e.target.value)}
                >
                  <option value="">All Grades</option>
                  {grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FilterRow>

            <Button
              variant="primary"
              onClick={generateReport}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Report"}
            </Button>
          </FiltersSection>

          {reportData && (
            <ReportPreview>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <Heading2>Report Preview</Heading2>
                <ExportOptions>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => exportReport("pdf")}
                  >
                    Export PDF
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => exportReport("excel")}
                  >
                    Export Excel
                  </Button>
                </ExportOptions>
              </div>

              {/* Summary Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    background: "#f8fafc",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {reportData.summary.totalStudents}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    Total Students
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    background: "#f8fafc",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {reportData.summary.averageAttendance}%
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    Avg Attendance
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    background: "#f8fafc",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    ${reportData.summary.totalRevenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    Total Revenue
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    background: "#f8fafc",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    ${reportData.summary.outstandingFees.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    Outstanding Fees
                  </div>
                </div>
              </div>

              {/* Chart */}
              <ChartContainer>
                <MockChart
                  title={selectedReport.title}
                  data={reportData.chartData}
                />
              </ChartContainer>

              {/* Data Table */}
              <DataTable>
                <thead>
                  <tr>
                    <TableHeader>Student Name</TableHeader>
                    <TableHeader>Grade</TableHeader>
                    <TableHeader>Attendance</TableHeader>
                    <TableHeader>Fee Status</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {reportData.tableData.map((row, index) => (
                    <tr key={index}>
                      <TableCell>{row.student}</TableCell>
                      <TableCell>{row.grade}</TableCell>
                      <TableCell>{row.attendance}</TableCell>
                      <TableCell>
                        <span
                          style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            backgroundColor:
                              row.fees === "Paid"
                                ? "#dcfce7"
                                : row.fees === "Pending"
                                ? "#fef3c7"
                                : "#fee2e2",
                            color:
                              row.fees === "Paid"
                                ? "#166534"
                                : row.fees === "Pending"
                                ? "#92400e"
                                : "#dc2626",
                          }}
                        >
                          {row.fees}
                        </span>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            </ReportPreview>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default Reports;
