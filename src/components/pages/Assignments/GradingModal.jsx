// src/components/Assignments/GradingModal.jsx
import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
} from "../../common/Modals/Modals.styles";
import {
  Form,
  FormGroup,
  Input,
  TextArea,
  Button,
  ErrorMessage,
  Label,
} from "../../common";

export const GradingModal = ({
  isOpen,
  onClose,
  onSubmit,
  submission,
  assignment,
}) => {
  const [formData, setFormData] = useState({
    marks_obtained: "",
    teacher_feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submission && submission.status !== "pending") {
      setFormData({
        marks_obtained: submission.marks_obtained || "",
        teacher_feedback: submission.teacher_feedback || "",
      });
    } else {
      setFormData({
        marks_obtained: "",
        teacher_feedback: "",
      });
    }
    setErrors({});
  }, [submission, isOpen]);

  if (!isOpen || !submission || !assignment) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const marks = parseFloat(formData.marks_obtained);
    if (!formData.marks_obtained || isNaN(marks)) {
      newErrors.marks_obtained = "Marks are required";
    } else if (marks < 0) {
      newErrors.marks_obtained = "Marks cannot be negative";
    } else if (marks > parseFloat(assignment.total_marks)) {
      newErrors.marks_obtained = `Marks cannot exceed ${assignment.total_marks}`;
    }

    if (!formData.teacher_feedback.trim()) {
      newErrors.teacher_feedback = "Feedback is required";
    } else if (formData.teacher_feedback.length < 10) {
      newErrors.teacher_feedback = "Feedback must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const gradeData = {
        marks_obtained: parseFloat(formData.marks_obtained),
        teacher_feedback: formData.teacher_feedback,
      };
      await onSubmit(gradeData);
    } catch (error) {
      if (error.error) {
        setErrors({ general: error.error });
      } else if (error.message) {
        setErrors({ general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const percentage =
    formData.marks_obtained && assignment.total_marks
      ? Math.round((formData.marks_obtained / assignment.total_marks) * 100)
      : null;

  const getGradeColor = (pct) => {
    if (pct >= 90) return "#059669";
    if (pct >= 80) return "#2563eb";
    if (pct >= 70) return "#f59e0b";
    if (pct >= 60) return "#ea580c";
    return "#dc2626";
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent size="lg" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <h2 style={{ margin: "0 0 0.25rem 0" }}>Grade Submission</h2>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
              {submission.student_name} - {assignment.title}
            </p>
          </div>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          {/* Submission Details */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <h3 style={{ margin: "0 0 1rem 0", color: "#1f2937" }}>
              Submission Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <div>
                <strong style={{ color: "#374151" }}>Student:</strong>
                <div style={{ color: "#4b5563" }}>{submission.student_name}</div>
              </div>
              <div>
                <strong style={{ color: "#374151" }}>Status:</strong>
                <div
                  style={{
                    color:
                      submission.status === "late" ? "#dc2626" : "#059669",
                    fontWeight: "500",
                  }}
                >
                  {submission.status === "late" ? "⚠️ Late Submission" : "✓ On Time"}
                </div>
              </div>
              <div>
                <strong style={{ color: "#374151" }}>Submitted:</strong>
                <div style={{ color: "#4b5563" }}>
                  {submission.submitted_at
                    ? formatDate(submission.submitted_at)
                    : "Not submitted"}
                </div>
              </div>
              <div>
                <strong style={{ color: "#374151" }}>Is Late:</strong>
                <div
                  style={{
                    color: submission.is_late ? "#dc2626" : "#059669",
                  }}
                >
                  {submission.is_late ? "Yes - 📌" : "No"}
                </div>
              </div>
            </div>

            {/* Submission Content Preview */}
            {(submission.submitted_text || submission.submitted_file) && (
              <div style={{ marginTop: "1rem" }}>
                <strong style={{ color: "#374151", display: "block", marginBottom: "0.5rem" }}>
                  Submitted Content:
                </strong>
                {submission.submitted_file && (
                  <div
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#f0f9ff",
                      border: "1px solid #bae6fd",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      color: "#0369a1",
                      marginBottom: "0.5rem",
                    }}
                  >
                    📎{" "}
                    <a
                      href={submission.submitted_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline" }}
                    >
                      {submission.submitted_file.split('/').pop()}
                    </a>
                  </div>
                )}
                {submission.submitted_text && (
                  <div
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#fafafa",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      color: "#374151",
                      maxHeight: "200px",
                      overflowY: "auto",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontFamily: "monospace",
                    }}
                  >
                    {submission.submitted_text}
                  </div>
                )}
              </div>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            {errors.general && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  border: "1px solid #fecaca",
                }}
              >
                {errors.general}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <FormGroup>
                <Label htmlFor="marks_obtained">
                  Marks Obtained (Max: {assignment.total_marks}) *
                </Label>
                <Input
                  type="number"
                  id="marks_obtained"
                  name="marks_obtained"
                  value={formData.marks_obtained}
                  onChange={handleChange}
                  hasError={!!errors.marks_obtained}
                  disabled={loading}
                  placeholder="0"
                  min="0"
                  max={assignment.total_marks}
                  step="0.5"
                />
                {errors.marks_obtained && (
                  <ErrorMessage>{errors.marks_obtained}</ErrorMessage>
                )}
              </FormGroup>

              {percentage !== null && (
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: `${getGradeColor(
                      percentage
                    )}20`,
                    border: `2px solid ${getGradeColor(percentage)}`,
                    borderRadius: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: getGradeColor(percentage),
                    }}
                  >
                    {percentage}%
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: getGradeColor(percentage),
                      marginTop: "0.25rem",
                    }}
                  >
                    {formData.marks_obtained} / {assignment.total_marks}
                  </div>
                </div>
              )}
            </div>

            <FormGroup>
              <Label htmlFor="teacher_feedback">
                Feedback for Student *
              </Label>
              <TextArea
                id="teacher_feedback"
                name="teacher_feedback"
                value={formData.teacher_feedback}
                onChange={handleChange}
                hasError={!!errors.teacher_feedback}
                disabled={loading}
                placeholder="Provide constructive feedback on the student's work. Highlight strengths and areas for improvement..."
                rows={6}
              />
              {errors.teacher_feedback && (
                <ErrorMessage>{errors.teacher_feedback}</ErrorMessage>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  Be specific and constructive in your feedback
                </small>
                <small
                  style={{
                    color:
                      formData.teacher_feedback.length > 1000
                        ? "#dc2626"
                        : "#6b7280",
                    fontSize: "0.75rem",
                  }}
                >
                  {formData.teacher_feedback.length} characters
                </small>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Marks and feedback required
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>⏳</span>
                    Saving Grade...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>✅</span>
                    Save Grade
                  </>
                )}
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GradingModal;
