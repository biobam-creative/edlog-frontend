import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../../contexts/AuthContext";
import { academicsService } from "../../../services";
import { reportService } from "../../../services";
import { Button } from "../../common";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background: #2c3e50;
  color: white;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media print {
    display: none;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  background: white;
  color: #2c3e50;
  font-size: 14px;
`;

const DashboardTitle = styled.h2`
  margin: 0 0 20px 0;
  color: white;
  font-size: 18px;
`;

const BulkReportCardGenerate = () => {
  const [grades, setGrades] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const data = await academicsService.getGrades();
      setGrades(data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching grades:", error);
      setLoading(false);
    }
  };

  const fetchTerms = async () => {
    setLoading(true);
    try {
      const data = await academicsService.getTerms();
      setTerms(data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching grades:", error);
      setLoading(false);
    }
  };

  const handleBulkReportGeneration = async (grade, term) => {
    setLoading(true);
    try {
      if (!grade || !term) {
        alert("Please select both class and term");
        setLoading(false);
        return;
      }

      const response = await reportService.bulkReportCardGeneration(
        grade,
        term,
      );

      // response.data is a Blob thanks to responseType: 'blob'
      const blob = response.data || response;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      const filename = `report_cards_grade_${grade}_term_${term}.pdf`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching grades:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <DashboardContainer>
      <Sidebar>
        <DashboardTitle>Report Portal</DashboardTitle>
        <div style={{ marginTop: "30px" }}>
          <h4>Report Filter</h4>
          <div>
            <label
              htmlFor="term"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Term
            </label>
            <FilterSelect
              id="term"
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
            >
              <option value="">Select Term</option>
              {terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.name} {term.academic_year.name}
                </option>
              ))}
            </FilterSelect>
          </div>

          <div>
            <label
              htmlFor="grade"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Classes
            </label>
            <FilterSelect
              id="grade"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">Select Class</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </FilterSelect>
          </div>
          <Button
            onClick={() => {
              handleBulkReportGeneration(selectedGrade, selectedTerm);
            }}
            variant="primary"
          >
            Generate Report Cards
          </Button>
        </div>
      </Sidebar>
    </DashboardContainer>
  );
};

export default BulkReportCardGenerate;
