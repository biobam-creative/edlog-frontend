// src/components/Assignments/StudentSubmissionModal.jsx
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

export const StudentSubmissionModal = ({
  isOpen,
  onClose,
  onSubmit,
  assignment,
  submission,
}) => {
  const [formData, setFormData] = useState({
    submitted_text: "",
    submitted_file: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (submission) {
      setFormData({
        submitted_text: submission.submitted_text || "",
        submitted_file: null,
      });
      if (submission.submitted_file) {
        setFileName(submission.submitted_file.split('/').pop());
      }
    } else {
      setFormData({
        submitted_text: "",
        submitted_file: null,
      });
      setFileName("");
    }
    setErrors({});
  }, [submission, isOpen]);

  if (!isOpen || !assignment) return null;

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          submitted_file: "File size must be less than 10MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        submitted_file: file,
      }));
      setFileName(file.name);
      if (errors.submitted_file) {
        setErrors((prev) => ({
          ...prev,
          submitted_file: "",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check submission type requirements
    if (assignment.submission_type === "file" && !formData.submitted_file) {
      newErrors.submitted_file = "This assignment requires a file submission";
    } else if (
      assignment.submission_type === "text" &&
      !formData.submitted_text.trim()
    ) {
      newErrors.submitted_text = "This assignment requires a text submission";
    } else if (
      assignment.submission_type === "both" &&
      !formData.submitted_file &&
      !formData.submitted_text.trim()
    ) {
      newErrors.general = "Please provide either a file or text submission";
    }

    // File size validation if file is present
    if (formData.submitted_file && formData.submitted_file.size > 10 * 1024 * 1024) {
      newErrors.submitted_file = "File size must be less than 10MB";
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
      const submissionFormData = new FormData();
      if (formData.submitted_text) {
        submissionFormData.append("submitted_text", formData.submitted_text);
      }
      if (formData.submitted_file) {
        submissionFormData.append("submitted_file", formData.submitted_file);
      }
      await onSubmit(submissionFormData);
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

  const getSubmissionTypeText = () => {
    switch (assignment.submission_type) {
      case "file":
        return "📁 File upload only";
      case "text":
        return "📝 Text submission only";
      case "both":
        return "📁 File or 📝 text submission";
      default:
        return "";
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

  const isOverdue = new Date() > new Date(assignment.due_date);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent size="lg" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <h2 style={{ margin: "0 0 0.25rem 0" }}>Submit Assignment</h2>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
              {assignment.title}
            </p>
          </div>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <div
            style={{
              padding: "1rem",
              backgroundColor: isOverdue ? "#fef2f2" : "#f0f9ff",
              border: `1px solid ${isOverdue ? "#fecaca" : "#bae6fd"}`,
              borderRadius: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <div>
                <strong style={{ color: isOverdue ? "#dc2626" : "#0369a1" }}>
                  Due Date:
                </strong>
                <div style={{ color: isOverdue ? "#7f1d1d" : "#0c4a6e" }}>
                  {formatDate(assignment.due_date)}
                </div>
              </div>
              <div>
                <strong style={{ color: isOverdue ? "#dc2626" : "#0369a1" }}>
                  Submission Type:
                </strong>
                <div style={{ color: isOverdue ? "#7f1d1d" : "#0c4a6e" }}>
                  {getSubmissionTypeText()}
                </div>
              </div>
              <div>
                <strong style={{ color: isOverdue ? "#dc2626" : "#0369a1" }}>
                  Total Marks:
                </strong>
                <div style={{ color: isOverdue ? "#7f1d1d" : "#0c4a6e" }}>
                  {assignment.total_marks}
                </div>
              </div>
            </div>
            {isOverdue && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem",
                  backgroundColor: "#fee2e2",
                  border: "1px solid #fca5a5",
                  borderRadius: "0.375rem",
                  color: "#dc2626",
                  fontSize: "0.875rem",
                }}
              >
                ⚠️ This assignment is past due. Late submissions may be subject to
                penalty.
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

            {assignment.submission_type !== "text" && (
              <FormGroup>
                <Label htmlFor="submitted_file">
                  {assignment.submission_type === "file"
                    ? "Upload File *"
                    : "Upload File (Optional)"}
                </Label>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <Input
                    type="file"
                    id="submitted_file"
                    onChange={handleFileChange}
                    disabled={loading}
                    style={{ flex: 1 }}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.ppt,.pptx"
                  />
                </div>
                {fileName && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: "#f0f9ff",
                      border: "1px solid #bae6fd",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      color: "#0369a1",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>📎 {fileName}</span>
                    {submission?.submitted_file === fileName && (
                      <span style={{ fontSize: "0.75rem", color: "#06b6d4" }}>
                        Uploaded
                      </span>
                    )}
                  </div>
                )}
                {errors.submitted_file && (
                  <ErrorMessage>{errors.submitted_file}</ErrorMessage>
                )}
                <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  Supported: PDF, Word, Images, PowerPoint (Max: 10MB)
                </small>
              </FormGroup>
            )}

            {assignment.submission_type !== "file" && (
              <FormGroup>
                <Label htmlFor="submitted_text">
                  {assignment.submission_type === "text"
                    ? "Your Response *"
                    : "Your Response (Optional)"}
                </Label>
                <TextArea
                  id="submitted_text"
                  name="submitted_text"
                  value={formData.submitted_text}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Type your answer or response here..."
                  rows={8}
                  style={{ fontFamily: "inherit" }}
                />
                {errors.submitted_text && (
                  <ErrorMessage>{errors.submitted_text}</ErrorMessage>
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
                    Write your complete response. Formatting is preserved.
                  </small>
                  <small
                    style={{
                      color:
                        formData.submitted_text.length > 5000
                          ? "#dc2626"
                          : "#6b7280",
                      fontSize: "0.75rem",
                    }}
                  >
                    {formData.submitted_text.length} characters
                  </small>
                </div>
              </FormGroup>
            )}

            {assignment.instructions && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                }}
              >
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#374151" }}>
                  📋 Instructions
                </h4>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {assignment.instructions}
                </div>
              </div>
            )}
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
              {assignment.submission_type === "both" ? (
                <>File and/or text required</>
              ) : (
                <>
                  {assignment.submission_type === "file"
                    ? "File required"
                    : "Text required"}
                </>
              )}
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>📤</span>
                    Submit Assignment
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

export default StudentSubmissionModal;
