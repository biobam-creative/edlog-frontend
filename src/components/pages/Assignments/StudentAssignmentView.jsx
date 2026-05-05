// src/components/pages/Assignments/StudentAssignmentView.jsx
import React, { useState, useEffect } from "react";
import { assignmentsService } from "../../../services";
import {
  PageHeader,
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
  CardActions,
  EmptyState,
} from "./Assignments.styles";
import {
  Heading1,
  Button,
  PageContainer,
  Select,
  FormGroup,
  Label,
  Input,
} from "../../common";
import { StudentSubmissionModal } from "./StudentSubmissionModal";

const StudentAssignmentView = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    filterAssignments();
  }, [assignments, searchTerm, statusFilter]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await assignmentsService.getAssignments();
      setAssignments(data);
      // Fetch submission status for each assignment
      await Promise.all(
        data.map(async (assignment) => {
          try {
            const submission = await assignmentsService.getStudentSubmission(
              assignment.id,
            );
            setSubmissions((prev) => ({
              ...prev,
              [assignment.id]: submission,
            }));
          } catch (error) {
            console.error(
              `Error fetching submission for assignment ${assignment.id}:`,
              error,
            );
          }
        }),
      );
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
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
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((assignment) => {
        const submission = submissions[assignment.id];
        if (statusFilter === "pending") {
          return !submission || submission.status === "pending";
        }
        if (statusFilter === "submitted") {
          return (
            submission &&
            (submission.status === "submitted" || submission.status === "late")
          );
        }
        if (statusFilter === "graded") {
          return submission && submission.status === "graded";
        }
        return true;
      });
    }

    setFilteredAssignments(filtered);
  };

  const handleSubmitClick = (assignment) => {
    console.log(assignment);
    setSelectedAssignment(assignment);
    setIsSubmissionModalOpen(true);
  };

  const handleSubmissionModalClose = () => {
    setIsSubmissionModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleSubmissionSave = async (submissionData) => {
    console.log(submissionData)
    try {
      await assignmentsService.submitAssignment(
        selectedAssignment.id,
        submissionData,
      );
      // Refresh submissions
      const updatedSubmission = await assignmentsService.getStudentSubmission(
        selectedAssignment.id,
      );
      setSubmissions((prev) => ({
        ...prev,
        [selectedAssignment.id]: updatedSubmission,
      }));
      handleSubmissionModalClose();
    } catch (error) {
      console.error("Error submitting assignment:", error);
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

  const getAssignmentStatus = (assignment) => {
    const submission = submissions[assignment.id];
    if (!submission || submission.status === "pending") {
      return {
        label: "Not Submitted",
        color: "#ef4444",
        bgColor: "#fee2e2",
      };
    }
    if (submission.status === "late") {
      return {
        label: "Late Submission",
        color: "#dc2626",
        bgColor: "#fecaca",
      };
    }
    if (submission.status === "submitted") {
      return {
        label: "Submitted",
        color: "#2563eb",
        bgColor: "#dbeafe",
      };
    }
    if (submission.status === "graded") {
      return {
        label: "Graded",
        color: "#059669",
        bgColor: "#d1fae5",
      };
    }
    return {
      label: "Unknown",
      color: "#6b7280",
      bgColor: "#f3f4f6",
    };
  };

  const getDueStatus = (assignment) => {
    const now = new Date();
    const due = new Date(assignment.due_date);
    const isPast = now > due;

    if (isPast) {
      return { label: "Overdue", color: "#dc2626", icon: "🔴" };
    }

    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return { label: "Due Soon", color: "#ea580c", icon: "🟡" };
    }
    return { label: "On time", color: "#059669", icon: "🟢" };
  };

  if (loading && assignments.length === 0) {
    return (
      <PageContainer>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Loading assignments...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <Heading1>My Assignments</Heading1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            View and submit your assignments
          </p>
        </div>
      </PageHeader>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormGroup style={{ margin: 0 }}>
          <Label>Filter by Status</Label>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Assignments</option>
            <option value="pending">Not Submitted</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
          </Select>
        </FormGroup>
      </div>

      {filteredAssignments.length === 0 ? (
        <EmptyState>
          <h3>No assignments found</h3>
          <p>
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "No assignments available at this time"}
          </p>
        </EmptyState>
      ) : (
        <AssignmentsGrid>
          {filteredAssignments.map((assignment) => {
            const submission = submissions[assignment.id];
            const status = getAssignmentStatus(assignment);
            const dueStatus = getDueStatus(assignment);

            return (
              <AssignmentCard key={assignment.id}>
                <AssignmentHeader>
                  <div>
                    <AssignmentTitle>{assignment.title}</AssignmentTitle>
                    <AssignmentMeta>
                      {assignment.subject_name} • {assignment.grade_name}
                    </AssignmentMeta>
                  </div>
                  <AssignmentStatus
                    color={status.color}
                    bgColor={status.bgColor}
                  >
                    {status.label}
                  </AssignmentStatus>
                </AssignmentHeader>

                <AssignmentInfo>
                  <AssignmentDescription>
                    {assignment.description}
                  </AssignmentDescription>

                  <AssignmentDetails>
                    <DetailItem>
                      <DetailLabel>Total Marks:</DetailLabel>
                      <DetailValue>{assignment.total_marks}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Due Date:</DetailLabel>
                      <DetailValue
                        style={{
                          color: dueStatus.color,
                          fontWeight: "500",
                        }}
                      >
                        {dueStatus.icon} {formatDate(assignment.due_date)}
                      </DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Submission Type:</DetailLabel>
                      <DetailValue>
                        {assignment.submission_type === "both"
                          ? "📁 File or 📝 Text"
                          : assignment.submission_type === "file"
                            ? "📁 File"
                            : "📝 Text"}
                      </DetailValue>
                    </DetailItem>
                    {submission && submission.status !== "pending" && (
                      <>
                        <DetailItem>
                          <DetailLabel>Submitted:</DetailLabel>
                          <DetailValue>
                            {submission.submitted_at
                              ? formatDate(submission.submitted_at)
                              : "Not yet"}
                          </DetailValue>
                        </DetailItem>
                        {submission.status === "graded" && (
                          <>
                            <DetailItem>
                              <DetailLabel>Marks:</DetailLabel>
                              <DetailValue
                                style={{
                                  color: "#059669",
                                  fontWeight: "bold",
                                }}
                              >
                                {submission.marks_obtained} /{" "}
                                {assignment.total_marks}
                              </DetailValue>
                            </DetailItem>
                          </>
                        )}
                      </>
                    )}
                  </AssignmentDetails>
                </AssignmentInfo>

                <CardActions>
                  {submission && submission.status === "graded" ? (
                    <div
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "#d1fae5",
                        border: "1px solid #6ee7b7",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        color: "#059669",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <strong>Feedback:</strong>
                      <div
                        style={{
                          marginTop: "0.25rem",
                          maxHeight: "100px",
                          overflowY: "auto",
                        }}
                      >
                        {submission.teacher_feedback}
                      </div>
                    </div>
                  ) : null}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {submission && submission.status === "graded" ? (
                      <Button variant="secondary" disabled>
                        Graded
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleSubmitClick(assignment)}
                      >
                        {submission &&
                        (submission.status === "submitted" ||
                          submission.status === "late")
                          ? "Resubmit"
                          : "Submit"}
                      </Button>
                    )}
                  </div>
                </CardActions>
              </AssignmentCard>
            );
          })}
        </AssignmentsGrid>
      )}

      <StudentSubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={handleSubmissionModalClose}
        onSubmit={handleSubmissionSave}
        assignment={selectedAssignment}
        submission={selectedAssignment && submissions[selectedAssignment.id]}
      />
    </PageContainer>
  );
};

export default StudentAssignmentView;
