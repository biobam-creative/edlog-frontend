// src/pages/Assignments/Assignments.jsx
import React, { useState, useEffect } from "react";
import { assignmentsService, academicsService } from "../../../services";
import {
  PageHeader,
  FiltersBar,
  AssignmentsGrid,
  AssignmentCard,
  AssignmentHeader,
  AssignmentInfo,
  AssignmentTitle,
  AssignmentMeta,
  AssignmentStatus,
  AssignmentDescription,
  AssignmentDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  SubmissionStats,
  StatsItem,
  StatsValue,
  StatsLabel,
  CardActions,
  EmptyState,
} from "./Assignments.styles";
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
import { AssignmentModal } from "./AssignmentModal";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    fetchAssignments();
    fetchGrades();
  }, []);

  useEffect(() => {
    filterAssignments();
  }, [assignments, searchTerm, gradeFilter, statusFilter]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await assignmentsService.getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGrades = async () => {
    try {
      const data = await academicsService.getGrades();
      setGrades(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const filterAssignments = () => {
    let filtered = assignments;

    if (searchTerm) {
      filtered = filtered.filter(
        (assignment) =>
          assignment.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.subject_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (gradeFilter) {
      filtered = filtered.filter(
        (assignment) => assignment.grade?.toString() === gradeFilter
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((assignment) => {
        if (statusFilter === "submitted") {
          return assignment.submission_count > 0;
        }
        if (statusFilter === "pending") {
          return assignment.submission_count === 0;
        }
        return true;
      });
    }

    setFilteredAssignments(filtered);
  };

  const handleCreateAssignment = () => {
    setSelectedAssignment(null);
    setIsModalOpen(true);
  };

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleAssignmentSave = async (assignmentData) => {
    try {
      if (selectedAssignment) {
        await assignmentsService.updateAssignment(
          selectedAssignment.id,
          assignmentData
        );
      } else {
        await assignmentsService.createAssignment(assignmentData);
      }
      await fetchAssignments();
      handleModalClose();
    } catch (error) {
      console.error("Error saving assignment:", error);
      throw error;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  };

  if (loading && assignments.length === 0) {
    return (
      <PageContainer>
        <div>Loading assignments...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <Heading1>Assignments</Heading1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Create and manage assignments for your classes
          </p>
        </div>
        <Button variant="primary" onClick={handleCreateAssignment}>
          Create Assignment
        </Button>
      </PageHeader>

      <FiltersBar>
        <Input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />

        <FormGroup style={{ minWidth: "150px", margin: 0 }}>
          <Label>Grade</Label>
          <Select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            <option value="">All Grades</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup style={{ minWidth: "150px", margin: 0 }}>
          <Label>Status</Label>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="submitted">With Submissions</option>
            <option value="pending">No Submissions</option>
          </Select>
        </FormGroup>
      </FiltersBar>

      <AssignmentsGrid>
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id}>
            <AssignmentHeader>
              <AssignmentInfo>
                <AssignmentTitle>{assignment.title}</AssignmentTitle>
                <AssignmentMeta>
                  <span>{assignment.subject_name}</span>
                  <span>•</span>
                  <span>{assignment.grade_name}</span>
                </AssignmentMeta>
              </AssignmentInfo>
              <AssignmentStatus
                status={assignment.is_past_due ? "overdue" : "published"}
              >
                {assignment.is_past_due ? "Overdue" : "Active"}
              </AssignmentStatus>
            </AssignmentHeader>

            <AssignmentDescription>
              {assignment.description?.substring(0, 100)}
              {assignment.description?.length > 100 ? "..." : ""}
            </AssignmentDescription>

            <AssignmentDetails>
              <DetailItem>
                <DetailLabel>Due Date</DetailLabel>
                <DetailValue>{formatDate(assignment.due_date)}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Time Remaining</DetailLabel>
                <DetailValue>
                  <span
                    style={{
                      color: assignment.is_past_due ? "#ef4444" : "#10b981",
                      fontWeight: "600",
                    }}
                  >
                    {getTimeRemaining(assignment.due_date)}
                  </span>
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Total Marks</DetailLabel>
                <DetailValue>{assignment.total_marks}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Teacher</DetailLabel>
                <DetailValue>{assignment.teacher_name}</DetailValue>
              </DetailItem>
            </AssignmentDetails>

            <SubmissionStats>
              <StatsItem>
                <StatsValue>{assignment.submission_count || 0}</StatsValue>
                <StatsLabel>Submitted</StatsLabel>
              </StatsItem>
              <StatsItem>
                <StatsValue>{assignment.graded_count || 0}</StatsValue>
                <StatsLabel>Graded</StatsLabel>
              </StatsItem>
              <StatsItem>
                <StatsValue>
                  {assignment.total_students
                    ? Math.round(
                        (assignment.submission_count /
                          assignment.total_students) *
                          100
                      )
                    : 0}
                  %
                </StatsValue>
                <StatsLabel>Completion</StatsLabel>
              </StatsItem>
            </SubmissionStats>

            <CardActions>
              <IconButton
                size="sm"
                onClick={() => handleEditAssignment(assignment)}
                title="Edit assignment"
              >
                ✏️
              </IconButton>
              <IconButton
                size="sm"
                onClick={() => {
                  /* View submissions */
                }}
                title="View submissions"
              >
                📋
              </IconButton>
              <IconButton
                size="sm"
                onClick={() => {
                  /* Grade assignments */
                }}
                title="Grade assignments"
              >
                📝
              </IconButton>
            </CardActions>
          </AssignmentCard>
        ))}
      </AssignmentsGrid>

      {filteredAssignments.length === 0 && !loading && (
        <EmptyState>
          <Heading2>No assignments found</Heading2>
          <p>Create your first assignment to get started.</p>
        </EmptyState>
      )}

      <AssignmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleAssignmentSave}
        assignment={selectedAssignment}
        grades={grades}
      />
    </PageContainer>
  );
};

export default Assignments;
