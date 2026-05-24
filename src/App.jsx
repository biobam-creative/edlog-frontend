// src/App.js
import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme/theme";
import GlobalStyles from "./theme/GlobalStyles";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Landing from "./components/pages/Landing/Landing";
import Login from "./components/pages/Login/Login";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Students from "./components/pages/Students/Students";
import Teachers from "./components/pages/Teachers/Teachers";
import Attendance from "./components/pages/Attendance/Attendance";
import Assignments from "./components/pages/Assignments/Assignments";
import Finance from "./components/pages/Finance/Finance";
import Reports from "./components/pages/Reports/Reports";
import School from "./components/pages/School/School";
import Signup from "./components/pages/School/Signup";
import SubjectScoresInput from "./components/pages/Results/SubjectScoreInput";
import ReportPortal from "./components/pages/ReportCard/ReportPortal";
import PerformanceInput from "./components/pages/ReportCard/PerformanceInput";
import AcademicYears from "./components/pages/Academics/AcademicYears";
import Terms from "./components/pages/Academics/Terms";
import Grades from "./components/pages/Academics/Grades";
import Subjects from "./components/pages/Academics/Subjects";
import StudentAssignmentView from "./components/pages/Assignments/StudentAssignmentView";
import StudentAssignmentList from "./components/pages/Assignments/StudentAssignmentList";
import BulkReportCardGenerate from "./components/pages/ReportCard/BulkReportCardGenerate";
import ReportVerify from "./components/pages/ReportCard/ReportVerify";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="verify-result/:id" element={<ReportVerify />} />
            <Route path="/app" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="assignments" element={<Assignments />} />
              <Route
                path="student-assignment"
                element={<StudentAssignmentView />}
              />
              <Route
                path="assignment-submissions"
                element={<StudentAssignmentList />}
              />
              <Route path="finance" element={<Finance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="schools" element={<School />} />
              <Route path="score-upload" element={<SubjectScoresInput />} />
              <Route path="report-card" element={<ReportPortal />} />
              <Route path="performance-input" element={<PerformanceInput />} />
              <Route path="academic-years" element={<AcademicYears />} />
              <Route path="terms" element={<Terms />} />
              <Route path="grades" element={<Grades />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="bulk-report" element={<BulkReportCardGenerate />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
