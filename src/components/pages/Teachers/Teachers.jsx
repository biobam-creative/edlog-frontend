// src/pages/Teachers/Teachers.js
import React, { useState, useEffect } from "react";
import { staffService } from "../../../services";
import {
  PageHeader,
  PageTitle,
  PageActions,
  FiltersBar,
  SearchInput,
  TeachersGrid,
  TeacherCard,
  TeacherHeader,
  TeacherAvatar,
  TeacherInfo,
  TeacherName,
  TeacherId,
  TeacherDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  SubjectsList,
  SubjectTag,
  CardActions,
} from "./Teachers.styles";
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
import { TeacherModal } from "./TeacherModal";
import { FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoRefreshCircle } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    filterTeachers();
  }, [teachers, searchTerm, specializationFilter]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await staffService.getTeachers();
      setTeachers(data);
    } catch (err) {
      setError("Failed to fetch teachers");
      console.error("Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterTeachers = () => {
    let filtered = teachers;

    if (searchTerm) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.teacher_id
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          teacher.specialization
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (specializationFilter) {
      filtered = filtered.filter((teacher) =>
        teacher.specialization
          ?.toLowerCase()
          .includes(specializationFilter.toLowerCase()),
      );
    }

    setFilteredTeachers(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecializationFilterChange = (e) => {
    setSpecializationFilter(e.target.value);
  };

  const handleCreateTeacher = () => {
    setSelectedTeacher(null);
    setIsModalOpen(true);
  };

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleTeacherSave = async (teacherData) => {
    try {
      if (selectedTeacher) {
        await staffService.updateTeacher(selectedTeacher.id, teacherData);
      } else {
        await staffService.createTeacher(teacherData);
      }
      await fetchTeachers();
      handleModalClose();
    } catch (error) {
      console.error("Error saving teacher:", error);
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

  const getAssignedSubjects = (teacher) => {
    // Mock data - in real app this would come from API
    return teacher.assigned_subjects || ["Mathematics", "Physics"];
  };

  if (loading && teachers.length === 0) {
    return (
      <PageContainer>
        <div>Loading teachers...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Teachers Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="secondary">Export</Button>
          <Button variant="primary" onClick={handleCreateTeacher}>
            Add New Teacher
          </Button>
        </PageActions>
      </PageHeader>

      <FiltersBar>
        <SearchInput
          type="text"
          placeholder="Search teachers by name, ID, or specialization..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormGroup style={{ minWidth: "200px", margin: 0 }}>
          <Label>Filter by Specialization</Label>
          <Select
            value={specializationFilter}
            onChange={handleSpecializationFilterChange}
          >
            <option value="">All Specializations</option>
            <option value="mathematics">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="history">History</option>
            <option value="computer">Computer Science</option>
          </Select>
        </FormGroup>
      </FiltersBar>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <TeachersGrid>
        {filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id}>
            <TeacherHeader>
              <TeacherAvatar>{getInitials(teacher.full_name)}</TeacherAvatar>
              <TeacherInfo>
                <TeacherName>{teacher.full_name}</TeacherName>
                <TeacherId>ID: {teacher.teacher_id}</TeacherId>
              </TeacherInfo>
            </TeacherHeader>

            <TeacherDetails>
              <DetailItem>
                <DetailLabel>Qualification</DetailLabel>
                <DetailValue>{teacher.qualification || "N/A"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Specialization</DetailLabel>
                <DetailValue>{teacher.specialization || "N/A"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Join Date</DetailLabel>
                <DetailValue>
                  {teacher.joining_date
                    ? new Date(teacher.joining_date).toLocaleDateString()
                    : "N/A"}
                </DetailValue>
              </DetailItem>
            </TeacherDetails>

            <SubjectsList>
              <DetailLabel>Assigned Subjects:</DetailLabel>
              {getAssignedSubjects(teacher).map((subject, index) => (
                <SubjectTag key={index}>{subject}</SubjectTag>
              ))}
            </SubjectsList>

            <CardActions>
              <IconButton
                size="sm"
                onClick={() => handleEditTeacher(teacher)}
                title="Edit teacher"
              >
                <FaPen />
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
              <IconButton
                size="sm"
                onClick={() => {
                  /* Assign subjects */
                }}
                title="Assign subjects"
              >
                <MdAssignmentAdd />
              </IconButton>
            </CardActions>
          </TeacherCard>
        ))}
      </TeachersGrid>

      {filteredTeachers.length === 0 && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#64748b",
          }}
        >
          <Heading2>No teachers found</Heading2>
          <p>Try adjusting your search criteria or add a new teacher.</p>
        </div>
      )}

      <TeacherModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleTeacherSave}
        teacher={selectedTeacher}
      />
    </PageContainer>
  );
};

export default Teachers;
