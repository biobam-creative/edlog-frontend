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
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Students from "./components/pages/Students/Students";
import Teachers from "./components/pages/Teachers/Teachers";
import Attendance from "./components/pages/Attendance/Attendance";
import Assignments from "./components/pages/Assignments/Assignments";
import Finance from "./components/pages/Finance/Finance";
import Reports from "./components/pages/Reports/Reports";
import School from "./components/pages/School/School";
import SubjectScoresInput from "./components/pages/Results/SubjectScoreInput";
import ReportPortal from "./components/pages/ReportCard/ReportPortal";
import PerformanceInput from "./components/pages/ReportCard/PerformanceInput";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="finance" element={<Finance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="schools" element={<School />} />
              <Route path="score-upload" element={<SubjectScoresInput />} />
              <Route path="report-card" element={<ReportPortal />} />
              <Route path="performance-input" element={<PerformanceInput />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
