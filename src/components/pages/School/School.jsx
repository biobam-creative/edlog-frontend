import React, { useState, useEffect } from "react";
import { schoolService, academicsService } from "../../../services";
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
} from "../Students/Students.styles";
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
import { SchoolModal } from "./SchoolModal";

const School = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await schoolService.getSchools();
      setSchools(data);
    } catch (err) {
      setError("Failed to fetch schools");
      console.error("Error fetching schools:", err);
    } finally {
      setLoading(false);
    }
  };

  //   const filterStudents = () => {
  //     let filtered = students;

  //     if (searchTerm) {
  //       filtered = filtered.filter(
  //         (student) =>
  //           student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           student.student_id?.toLowerCase().includes(searchTerm.toLowerCase()),
  //       );
  //     }

  //     if (gradeFilter) {
  //       filtered = filtered.filter(
  //         (student) => student.grade?.toString() === gradeFilter,
  //       );
  //     }

  //     setFilteredStudents(filtered);
  //   };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateSchool = () => {
    setSelectedSchool(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (school) => {
    console.log(school);
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSchool(null);
  };

  const handleSchoolSave = async (schoolData) => {
    try {
      if (selectedSchool) {
        // Update existing student
        await schoolService.updateStudent(selectedSchool.id, schoolData);
      } else {
        // Create new student
        await schoolService.createSchool(schoolData);
      }
      await fetchSchools(); // Refresh the list
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
  if (loading && schools.length === 0) {
    return (
      <PageContainer>
        <div>Loading schools...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Schools Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="secondary">Export</Button>
          <Button variant="primary" onClick={handleCreateSchool}>
            Add New School
          </Button>
        </PageActions>
      </PageHeader>

      <FiltersBar>
        <SearchInput
          type="text"
          placeholder="Search schools by name or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* <FormGroup style={{ minWidth: "200px", margin: 0 }}>
            <Label>Filter by Grade</Label>
            <Select value={gradeFilter} onChange={handleGradeFilterChange}>
              <option value="">All Grades</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </Select>
          </FormGroup> */}
      </FiltersBar>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <StudentsGrid>
        {schools.map((school) => (
          <StudentCard key={school.id}>
            <StudentHeader>
              <StudentAvatar>{getInitials(school.name)}</StudentAvatar>
              <StudentInfo>
                <StudentName>{school.name}</StudentName>
                <StudentId>ID: {school.id}</StudentId>
              </StudentInfo>
            </StudentHeader>

            <StudentDetails>
              {/* <DetailItem> */}
              {/* <DetailLabel>Grade</DetailLabel>
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
                </DetailItem> */}
              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>
                  <span
                    style={{
                      color: school.admin?.is_active ? "#10b981" : "#ef4444",
                      fontWeight: "600",
                    }}
                  >
                    {school.admin?.is_active ? "Active" : "Inactive"}
                  </span>
                </DetailValue>
              </DetailItem>
            </StudentDetails>

            <CardActions>
              <IconButton
                size="sm"
                onClick={() => handleEditStudent(school)}
                title="Edit student"
              >
                ✏️
              </IconButton>
              <IconButton
                size="sm"
                onClick={() => {
                  /* View details */
                }}
                title="View details"
              >
                👁️
              </IconButton>
            </CardActions>
          </StudentCard>
        ))}
      </StudentsGrid>

      {schools.length === 0 && !loading && (
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

      <SchoolModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSchoolSave}
        school={selectedSchool}
        // grades={grades}
      />
    </PageContainer>
  );
};

export default School;
