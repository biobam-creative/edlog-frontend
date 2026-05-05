// src/pages/Students/Students.js
import React, { useState, useEffect } from "react";
import { studentsService, academicsService } from "../../../services";
import {
  PageHeader,
  PageTitle,
  PageActions,
  FiltersBar,
  SearchInput,
  StudentsGrid,
  StudentCard,
  StudentHeader,
  StudentAvatar,
  StudentInfo,
  StudentName,
  StudentId,
  StudentDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  CardActions,
} from "./Students.styles";
import {
  Heading1,
  Heading2,
  Button,
  IconButton,
  PageContainer,
  Select,
  FormGroup,
  Label,
} from "../../common";
import { StudentModal } from "../../Students/StudentModal";
import { FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoRefreshCircle } from "react-icons/io5";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkGrade, setBulkGrade] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchGrades();
    fetchTerms();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, gradeFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await studentsService.getStudents();
      setStudents(data);
    } catch (err) {
      setError("Failed to fetch students");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGrades = async () => {
    try {
      // This would typically come from academicsService
      const grades = await academicsService.getGrades();

      setGrades(grades);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const fetchTerms = async () => {
    try {
      const t = await academicsService.getTerms();
      setTerms(t);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.student_id?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (gradeFilter) {
      filtered = filtered.filter(
        (student) => student.grade?.toString() === gradeFilter,
      );
    }

    setFilteredStudents(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGradeFilterChange = (e) => {
    setGradeFilter(e.target.value);
  };

  const handleCreateStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    console.log(student);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleStudentSave = async (studentData) => {
    try {
      if (selectedStudent) {
        // Update existing student
        await studentsService.updateStudent(selectedStudent.id, studentData);
      } else {
        // Create new student
        await studentsService.createStudent(studentData);
      }
      await fetchStudents(); // Refresh the list
      handleModalClose();
    } catch (error) {
      console.error("Error saving student:", error);
      throw error;
    }
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "??"
    );
  };

  if (loading && students.length === 0) {
    return (
      <PageContainer>
        <div>Loading students...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Students Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="secondary">Export</Button>
          <Button variant="primary" onClick={handleCreateStudent}>
            Add New Student
          </Button>
          <Button variant="secondary" onClick={() => setShowBulkModal(true)}>
            Bulk Subscribe
          </Button>
        </PageActions>
      </PageHeader>

      <FiltersBar>
        <SearchInput
          type="text"
          placeholder="Search students by name or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormGroup style={{ minWidth: "200px", margin: 0 }}>
          <Label>Filter by Class</Label>
          <Select value={gradeFilter} onChange={handleGradeFilterChange}>
            <option value="">All Classes</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup style={{ minWidth: "200px", margin: 0, marginLeft: 8 }}>
          <Label>Term</Label>
          <Select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Select Term</option>
            {terms.map((term) => (
              <option key={term.id} value={term.id}>
                {term.name}
              </option>
            ))}
          </Select>
        </FormGroup>
      </FiltersBar>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <StudentsGrid>
        {filteredStudents.map((student) => (
          <StudentCard key={student.id}>
            <StudentHeader>
              <StudentAvatar>{getInitials(student.full_name)}</StudentAvatar>
              <StudentInfo>
                <StudentName>{student.full_name}</StudentName>
                <StudentId>ID: {student.student_id}</StudentId>
              </StudentInfo>
            </StudentHeader>

            <StudentDetails>
              <DetailItem>
                <DetailLabel>Grade</DetailLabel>
                <DetailValue>{student.grade_name || "N/A"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Roll No</DetailLabel>
                <DetailValue>{student.roll_number || "N/A"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Attendance</DetailLabel>
                <DetailValue>
                  {student.attendance_percentage || "0"}%
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>
                  <span
                    style={{
                      color: student.user?.is_active ? "#10b981" : "#ef4444",
                      fontWeight: "600",
                    }}
                  >
                    {student.user?.is_active ? "Active" : "Inactive"}
                  </span>
                </DetailValue>
              </DetailItem>
            </StudentDetails>

            <CardActions>
              <IconButton
                size="sm"
                onClick={() => handleEditStudent(student)}
                title="Edit student"
              >
                <FaPen />
              </IconButton>
              <IconButton
                size="sm"
                onClick={async () => {
                  if (!selectedTerm) {
                    alert("Select a term first");
                    return;
                  }
                  try {
                    await studentsService.renewSubscription(
                      student.id,
                      selectedTerm,
                    );
                    alert("Subscription renewed");
                    fetchStudents();
                  } catch (err) {
                    console.error(err);
                    alert(
                      "Failed to renew subscription: " +
                        (err.error || JSON.stringify(err)),
                    );
                  }
                }}
                title="Renew subscription"
              >
                <IoRefreshCircle />
              </IconButton>
              <IconButton
                size="sm"
                onClick={() => {
                  /* View details */
                }}
                title="View details"
              >
                <FaEye />
              </IconButton>
            </CardActions>
          </StudentCard>
        ))}
      </StudentsGrid>

      {filteredStudents.length === 0 && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#64748b",
          }}
        >
          <Heading2>No students found</Heading2>
          <p>Try adjusting your search criteria or add a new student.</p>
        </div>
      )}

      <StudentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleStudentSave}
        student={selectedStudent}
        grades={grades}
      />
      {showBulkModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              width: 400,
              borderRadius: 8,
            }}
          >
            <h3>Bulk Subscribe</h3>
            {bulkError && <div style={{ color: "red" }}>{bulkError}</div>}
            <div style={{ marginBottom: 8 }}>
              <Label>Grade</Label>
              <Select
                value={bulkGrade}
                onChange={(e) => setBulkGrade(e.target.value)}
              >
                <option value="">All Grades</option>
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: 8 }}>
              <Label>Term</Label>
              <Select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="">Select Term</option>
                {terms.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Select>
            </div>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button
                variant="secondary"
                onClick={() => {
                  setShowBulkModal(false);
                  setBulkError("");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={async () => {
                  if (!selectedTerm) {
                    setBulkError("Select a term");
                    return;
                  }
                  setBulkLoading(true);
                  setBulkError("");
                  try {
                    const payload = {
                      grade_id: bulkGrade || null,
                      term_id: selectedTerm,
                    };
                    await studentsService.bulkRenewSubscriptions(payload);
                    alert("Bulk subscription completed");
                    setShowBulkModal(false);
                    fetchStudents();
                  } catch (err) {
                    console.error(err);
                    setBulkError(err.error || "Failed");
                  }
                  setBulkLoading(false);
                }}
              >
                {bulkLoading ? "Processing..." : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Students;
