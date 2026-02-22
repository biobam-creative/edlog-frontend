import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReportCard from "./ReportCard";
import { useAuth } from "../../../contexts/AuthContext";
import { academicsService } from "../../../services";

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
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
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
    console.log(user);
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const data = await academicsService.getTerms();
      setTerms(data);
      if (data.length > 0) {
        setSelectedTerm(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      // In a real app, fetch from your API
      // For demo, using mock data
      const mockStudents = [
        {
          id: 1,
          name: "FAMUREWA Irebami John",
          admission_number: "GFNPS/2017/0225",
          class: "BASIC 5",
        },
        {
          id: 1,
          name: "FAMUREWA Ayo John",
          admission_number: "GFNPS/2017/0245",
          class: "BASIC 5",
        },
      ];
      setStudents(mockStudents);
      setSelectedStudent(mockStudents[0]);
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
      <Sidebar>
        <DashboardTitle>Report Portal</DashboardTitle>

        {user.user_type === "parent" && (
          <>
            <h3 style={{ marginTop: "30px" }}>My Children</h3>
            <StudentList>
              {students.map((student) => (
                <StudentItem
                  key={student.admission_number}
                  active={
                    selectedStudent?.admission_number ===
                    student.admission_number
                  }
                  onClick={() => setSelectedStudent(student)}
                >
                  {student.name}
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>
                    {student.class} • {student.admission_number}
                  </div>
                </StudentItem>
              ))}
            </StudentList>
          </>
        )}

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
              {terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.name} {term.academic_year.name}
                </option>
              ))}
            </FilterSelect>
          </div>

          <div style={{ marginTop: "15px" }}>
            <label
              htmlFor="year"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Academic Year
            </label>
            <FilterSelect
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
            </FilterSelect>
          </div>
        </div>
      </Sidebar>

      <MainContent>
        {selectedStudent ? (
          <ReportCard
            studentId={
              user.user_type === "student" ? user.id : selectedStudent.id
            }
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
