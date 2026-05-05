// src/components/Assignments/AssignmentModal.jsx
import React, { useState, useEffect, useMemo } from "react";
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
  FormRow,
  Input,
  TextArea,
  Select,
  Button,
  ErrorMessage,
  Label,
  DateInput,
} from "../../common";

// Mock subjects - in real app, this would come from API
const defaultSubjects = [
  { id: 1, name: "Mathematics", grade_id: 1 },
  { id: 2, name: "Science", grade_id: 1 },
  { id: 3, name: "English", grade_id: 1 },
  { id: 4, name: "Social Studies", grade_id: 1 },
  { id: 5, name: "Computer Science", grade_id: 1 },
  { id: 6, name: "Physics", grade_id: 2 },
  { id: 7, name: "Chemistry", grade_id: 2 },
  { id: 8, name: "Biology", grade_id: 2 },
  { id: 9, name: "Advanced Mathematics", grade_id: 2 },
];

export const AssignmentModal = ({
  isOpen,
  onClose,
  onSave,
  assignment,
  grades,
  subjects,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    grade: "",
    due_date: "",
    total_marks: "",
    instructions: "",
    attachment: null,
    submission_type: "both",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  // Assignment types
  const submitissionTypeOptions = [
    { value: "file", label: "File Upload Only" },
    { value: "text", label: "Text Submission Only" },
    { value: "both", label: "File or Text Submission" },
  ];

  const assignmentTypes = [
    { value: "homework", label: "Homework" },
    { value: "classwork", label: "Classwork" },
    { value: "project", label: "Project" },
    { value: "quiz", label: "Quiz" },
    { value: "exam", label: "Exam" },
    { value: "presentation", label: "Presentation" },
  ];

  const availableSubjects = useMemo(
    () => subjects || defaultSubjects,
    [subjects],
  );

  useEffect(() => {
    console.log(subjects);
    if (assignment) {
      setFormData({
        title: assignment.title || "",
        description: assignment.description || "",
        subject: assignment.subject || "",
        grade: assignment.grade || "",
        due_date: assignment.due_date ? assignment.due_date.split("T")[0] : "",
        total_marks: assignment.total_marks || "",
        instructions: assignment.instructions || "",
        attachment: assignment.attachment || null,
        submission_type: assignment.submission_type || "both",
      });
    } else {
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 7); // Default due in 7 days

      setFormData({
        title: "",
        description: "",
        subject: "",
        grade: "",
        due_date: dueDate.toISOString().split("T")[0],
        total_marks: "",
        instructions: "",
        attachment: null,
        submission_type: "both",
      });
    }
    setErrors({});
  }, [assignment, isOpen]);

  useEffect(() => {
    // Filter subjects based on selected grade
    if (formData.grade) {
      const filtered = subjects.filter(
        (subject) => subject.grade == formData.grade,
      );
      console.log(filtered);
      setFilteredSubjects(filtered);

      // Auto-select first subject if only one exists and no subject is selected
      if (filtered.length === 1 && !formData.subject) {
        setFormData((prev) => ({
          ...prev,
          subject: filtered[0].id.toString(),
        }));
      }
    } else {
      setFilteredSubjects([]);
    }
  }, [formData.grade, availableSubjects]);

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setFormData((prev) => ({
        ...prev,
        attachment: file,
      }));
      console.log(formData);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) {
      newErrors.title = "Assignment title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.due_date) {
      newErrors.due_date = "Due date is required";
    } else {
      const dueDate = new Date(formData.due_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        newErrors.due_date = "Due date cannot be in the past";
      }
    }

    if (!formData.total_marks || parseFloat(formData.total_marks) <= 0) {
      newErrors.total_marks = "Valid total marks is required";
    } else if (parseFloat(formData.total_marks) > 1000) {
      newErrors.total_marks = "Total marks cannot exceed 1000";
    }

    if (!formData.assignment_type) {
      newErrors.assignment_type = "Assignment type is required";
    }

    if (!formData.submission_type) {
      newErrors.submission_type = "Submission type is required";
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
      const assignmentFormData = new FormData();
      assignmentFormData.append("title", formData.title);
      assignmentFormData.append("description", formData.description);
      assignmentFormData.append("subject", parseInt(formData.subject));
      assignmentFormData.append("grade", parseInt(formData.grade));
      assignmentFormData.append("due_date", formData.due_date);
      assignmentFormData.append(
        "total_marks",
        parseFloat(formData.total_marks),
      );
      assignmentFormData.append("submission_type", formData.submission_type);
      assignmentFormData.append("instructions", formData.instructions);
      if (formData.attachment instanceof File) {
        assignmentFormData.append("attachment", formData.attachment);
      }

      console.log(assignmentFormData);
      await onSave(assignmentFormData);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.message) {
        setErrors({ general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const getTimeRemaining = () => {
    if (!formData.due_date) return "";

    const dueDate = new Date(formData.due_date);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  };

  const handleInstructionsChange = (e) => {
    const instructions = e.target.value;
    setFormData((prev) => ({
      ...prev,
      instructions: instructions,
    }));

    // Auto-generate description if empty and instructions are provided
    if (!formData.description && instructions.length > 0) {
      setFormData((prev) => ({
        ...prev,
        description:
          instructions.substring(0, 200) +
          (instructions.length > 200 ? "..." : ""),
      }));
    }
  };

  if (!isOpen) return null;

  const timeRemaining = getTimeRemaining();
  const isOverdue = timeRemaining === "Overdue";

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent size="lg" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2 style={{ margin: 0 }}>
            {assignment ? "Edit Assignment" : "Create New Assignment"}
          </h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
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

            <h3
              style={{
                marginBottom: "1rem",
                color: "#374151",
                borderBottom: "2px solid #e5e7eb",
                paddingBottom: "0.5rem",
              }}
            >
              Basic Information
            </h3>

            <FormRow>
              <FormGroup>
                <Label htmlFor="title">Assignment Title *</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  hasError={!!errors.title}
                  disabled={loading}
                  placeholder="Enter a clear and descriptive title for the assignment"
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
                <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  Be specific about what students need to do
                </small>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="assignment_type">Assignment Type *</Label>
                <Select
                  id="assignment_type"
                  name="assignment_type"
                  value={formData.assignment_type}
                  onChange={handleChange}
                  hasError={!!errors.assignment_type}
                  disabled={loading}
                >
                  <option value="">Select Type</option>
                  {assignmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
                {errors.assignment_type && (
                  <ErrorMessage>{errors.assignment_type}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="submission_type">Submission Type *</Label>
                <Select
                  id="submission_type"
                  name="submission_type"
                  value={formData.submission_type}
                  onChange={handleChange}
                  hasError={!!errors.submission_type}
                  disabled={loading}
                >
                  {submitissionTypeOptions.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
                {errors.submission_type && (
                  <ErrorMessage>{errors.submission_type}</ErrorMessage>
                )}
                <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  Choose how students will submit their work
                </small>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="total_marks">Total Marks *</Label>
                <Input
                  type="number"
                  id="total_marks"
                  name="total_marks"
                  value={formData.total_marks}
                  onChange={handleChange}
                  hasError={!!errors.total_marks}
                  disabled={loading}
                  placeholder="100"
                  min="1"
                  max="1000"
                  step="0.5"
                />
                {errors.total_marks && (
                  <ErrorMessage>{errors.total_marks}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label></Label>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  hasError={!!errors.grade}
                  disabled={loading}
                >
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </Select>
                {errors.grade && <ErrorMessage>{errors.grade}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  hasError={!!errors.subject}
                  disabled={loading || !formData.grade}
                >
                  <option value="">Select Subject</option>
                  {filteredSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </Select>
                {errors.subject && (
                  <ErrorMessage>{errors.subject}</ErrorMessage>
                )}
                {!formData.grade && (
                  <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                    Select a grade first to see available subjects
                  </small>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="due_date">Due Date *</Label>
                <DateInput
                  id="due_date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  hasError={!!errors.due_date}
                  disabled={loading}
                />
                {errors.due_date && (
                  <ErrorMessage>{errors.due_date}</ErrorMessage>
                )}
                {formData.due_date && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: isOverdue ? "#fef2f2" : "#f0f9ff",
                      border: `1px solid ${isOverdue ? "#fecaca" : "#bae6fd"}`,
                      borderRadius: "0.375rem",
                      color: isOverdue ? "#dc2626" : "#0369a1",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                    }}
                  >
                    {timeRemaining}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="attachment">Attachment</Label>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <Input
                    type="file"
                    id="attachment"
                    onChange={handleFileUpload}
                    disabled={loading}
                    style={{ flex: 1 }}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                </div>
                {formData.attachment_url && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: "#f0f9ff",
                      border: "1px solid #bae6fd",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      color: "#0369a1",
                    }}
                  >
                    📎 {formData.attachment_url}
                  </div>
                )}
                <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  Supported: PDF, Word, Images, Text files (Max: 10MB)
                </small>
              </FormGroup>
            </FormRow>

            <h3
              style={{
                marginBottom: "1rem",
                color: "#374151",
                borderBottom: "2px solid #e5e7eb",
                paddingBottom: "0.5rem",
                marginTop: "2rem",
              }}
            >
              Assignment Details
            </h3>

            <FormGroup>
              <Label htmlFor="instructions">Detailed Instructions</Label>
              <TextArea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInstructionsChange}
                disabled={loading}
                placeholder="Provide step-by-step instructions for students. Include requirements, format guidelines, submission instructions, and any other important details..."
                rows={6}
              />
              <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                Clear instructions help students understand exactly what's
                expected
              </small>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Brief Description *</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                hasError={!!errors.description}
                disabled={loading}
                placeholder="Provide a concise overview of the assignment. This will be visible in assignment lists..."
                rows={3}
              />
              {errors.description && (
                <ErrorMessage>{errors.description}</ErrorMessage>
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
                  Keep it brief but informative
                </small>
                <small
                  style={{
                    color:
                      formData.description.length > 250 ? "#dc2626" : "#6b7280",
                    fontSize: "0.75rem",
                    fontWeight:
                      formData.description.length > 250 ? "600" : "normal",
                  }}
                >
                  {formData.description.length}/250 characters
                </small>
              </div>
            </FormGroup>

            {/* Assignment Preview */}
            {(formData.title || formData.description) && (
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  marginTop: "1.5rem",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#374151",
                    fontSize: "1rem",
                  }}
                >
                  Assignment Preview
                </h4>
                <div style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
                  {formData.title && (
                    <h5 style={{ margin: "0 0 0.5rem 0", color: "#1f2937" }}>
                      {formData.title}
                    </h5>
                  )}
                  {formData.description && (
                    <p style={{ margin: "0 0 1rem 0", color: "#4b5563" }}>
                      {formData.description}
                    </p>
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "1rem",
                      fontSize: "0.75rem",
                      color: "#6b7280",
                    }}
                  >
                    {formData.grade && (
                      <div>
                        <strong>Grade:</strong>{" "}
                        {grades.find((g) => g.id == formData.grade)?.name}
                      </div>
                    )}
                    {formData.subject && (
                      <div>
                        <strong>Subject:</strong>{" "}
                        {
                          filteredSubjects.find((s) => s.id == formData.subject)
                            ?.name
                        }
                      </div>
                    )}
                    {formData.assignment_type && (
                      <div>
                        <strong>Type:</strong>{" "}
                        {
                          assignmentTypes.find(
                            (t) => t.value === formData.assignment_type,
                          )?.label
                        }
                      </div>
                    )}
                    {formData.total_marks && (
                      <div>
                        <strong>Marks:</strong> {formData.total_marks}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              // </Form>
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
              * Required fields
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>⏳</span>
                    {assignment ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>
                      {assignment ? "✏️" : "📝"}
                    </span>
                    {assignment ? "Update Assignment" : "Create Assignment"}
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

export default AssignmentModal;
