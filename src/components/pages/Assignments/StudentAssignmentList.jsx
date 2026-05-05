import React, { useState, useEffect } from "react";
import { assignmentsService } from "../../../services";
import {
  PageHeader,
  AssignmentsGrid,
  AssignmentCard,
  AssignmentHeader,
  AssignmentInfo,
  AssignmentTitle,
  AssignmentDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  CardActions,
} from "./Assignments.styles";
import { Heading1, IconButton, PageContainer } from "../../common";
import { GradingModal } from "./GradingModal";
import { useLocation } from "react-router-dom";

const StudentAssignmentList = () => {
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const { state } = useLocation();

  useEffect(() => {
    console.log(state);
    fetchAssignmentsSubmissions();

    console.log("helo");
  }, []);

  const fetchAssignmentsSubmissions = async () => {
    try {
      setLoading(true);
      const data = await assignmentsService.getAssignmentSubmissions(state.id);
      setStudentSubmissions(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setSelectedSubmission(null);
  };

  const handleGradeAssignment = (submission) => {
    setSelectedSubmission(submission);
    setSelectedAssignment(submission.assignment);
    setIsModalOpen(true);
  };

  const handleGradeSave = async (gradeData) => {
    try {
      console.log(gradeData);
      if (selectedSubmission) {
        await assignmentsService.gradeAssignment(
          selectedSubmission.id,
          gradeData,
        );
      } else {
        console.log("data not found");
        // await assignmentsService.createAssignment(assignmentData);
      }
      await fetchAssignmentsSubmissions();
      handleModalClose();
    } catch (error) {
      console.error("Error saving assignment:", error);
      throw error;
    }
  };

  if (loading && studentSubmissions.length === 0) {
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
          <Heading1>Students Assignment Submission</Heading1>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Create and manage assignments for your classes
          </p>
        </div>
      </PageHeader>

      <AssignmentsGrid>
        {studentSubmissions.map((submission) => (
          <AssignmentCard key={submission.id}>
            <AssignmentHeader>
              <AssignmentInfo>
                <AssignmentTitle>{submission.assignment_title}</AssignmentTitle>
              </AssignmentInfo>
            </AssignmentHeader>

            <AssignmentDetails>
              <DetailItem>
                <DetailLabel>Student Name</DetailLabel>
                <DetailValue>{submission.student_name}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>{submission.status}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Submission Date</DetailLabel>
                <DetailValue>{submission.submitted_at}</DetailValue>
              </DetailItem>
            </AssignmentDetails>

            <CardActions>
              <IconButton
                size="sm"
                onClick={() => handleGradeAssignment(submission)}
                title="Grade submissions"
              >
                📝
              </IconButton>
            </CardActions>
          </AssignmentCard>
        ))}
      </AssignmentsGrid>

      <GradingModal
        onSubmit={handleGradeSave}
        submission={selectedSubmission}
        assignment={selectedAssignment}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </PageContainer>
  );
};

export default StudentAssignmentList;
