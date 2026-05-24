import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReportCard from "./ReportCard";
import { useAuth } from "../../../contexts/AuthContext";
import { academicsService, studentsService } from "../../../services";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
  flex-direction: column;
`;

const FilterSection = styled.div`
  width: 100%;
  background: #2c3e50;
  color: white;
  padding: 20px;

  @media print {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  @media print {
    padding: 0;
  }
`;

const StudentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const StudentItem = styled.li`
  padding: 12px 15px;
  margin: 5px 0;
  background: ${(props) => (props.active ? "#3498db" : "transparent")};
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.active ? "#2980b9" : "#34495e")};
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

const ReportPortal = () => {
  const [students, setStudents] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025/2026");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    console.log(user?.user_type);
    if (user?.user_type === "parent") {
      fetchStudents();
    } else {
      if (user?.user_type === "student") {
        setSelectedStudent(user.id);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const data = await academicsService.getTerms();
      setTerms(data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    console.log(user);
    try {
      const data = await studentsService.getParentWards();
      setStudents(data);
      // setSelectedStudent(mockStudents[0]);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <FilterSection>
        <DashboardTitle>Report Portal</DashboardTitle>
        <div style={{ display: "flex", gap: "20px" }}>
          {user.user_type === "parent" && (
            <>
              <div>
                <label
                  htmlFor="wards"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Select Wards
                </label>
                <FilterSelect
                  id="wards"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">Select Ward</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.user.id}>
                      {student.user.first_name + " " + student.user.last_name}
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </>
          )}

          <div>
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
          </div>
        </div>
      </FilterSection>

      <MainContent>
        {selectedStudent ? (
          <ReportCard
            studentId={user.user_type === "student" ? user.id : selectedStudent}
            term={selectedTerm}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "#666",
            }}
          >
            <h3>Welcome to Report Portal</h3>
            <p>Select a student to view their report card</p>
          </div>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default ReportPortal;
