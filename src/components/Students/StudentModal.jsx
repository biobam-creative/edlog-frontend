// src/components/Students/StudentModal.js
import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
} from "../../components/common/Modals/Modals.styles";
import {
  Form,
  FormGroup,
  FormRow,
  Input,
  Label,
  Select,
  Button,
  ErrorMessage,
} from "../../components/common";

export const StudentModal = ({ isOpen, onClose, onSave, student, grades }) => {
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    student_id: "",
    admission_date: "",
    grade: "",
    roll_number: "",
    parent: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      relationship: "",
      occupation: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const relationship = [
    { name: "father", label: "Father" },
    { name: "mother", label: "Mother" },
    { name: "guardian", label: "Guardian" },
  ];

  useEffect(() => {
    if (student) {
      setFormData({
        user:{
          first_name: student.user?.first_name || "",
          last_name: student.user?.last_name || "",
          email: student.user?.email || "",
          phone: student.user?.phone || "",
        },
        student_id: student.student_id || "",
        admission_date: student.admission_date || "",
        grade: student.grade || "",
        roll_number: student.roll_number || "",
        parent:{
          parent_first_name: student.parent.user.first_name || "",
          parent_last_name: student.parent.user?.last_name || "",
          parent_phone: student.parent.phone || "",
          parent_email: student.parent.user?.email || "",
          relationship: student.parent.relationship,
          occupation: student.parent.occupation,
        }
      });
      console.log(formData)
    } else {
      setFormData({
        user: {
          first_name: "",
          last_name: "",
          user_type: "student",
          email: "",
          phone: "",
          password: "",
        },
        student_id: "",
        admission_date: new Date().toISOString().split("T")[0],
        grade: "",
        roll_number: "",
        parent: {
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          relationship: "",
          occupation: "",
          user_type: "parent",
        },
      });
    }
    setErrors({});
  }, [student, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "first_name":
        setFormData((prev) => ({
          ...prev,
          user: {
            ...formData.user,
            first_name: value,
          },
        }));
        break;
      case "last_name":
        setFormData((prev) => ({
          ...prev,
          user: {
            ...formData.user,
            last_name: value,
          },
        }));
        break;
      case "email":
        setFormData((prev) => ({
          ...prev,
          user: {
            ...formData.user,
            email: value,
          },
        }));
        break;
      case "phone":
        setFormData((prev) => ({
          ...prev,
          user: {
            ...formData.user,
            phone: value,
            password: value,
          },
        }));
        break;
      case "parent_first_name":
        setFormData((prev) => ({
          ...prev,
          parent: {
            ...formData.parent,
            first_name: value,
          },
        }));
        break;
      case "parent_last_name":
        setFormData((prev) => ({
          ...prev,
          parent: {
            ...formData.parent,
            last_name: value,
          },
        }));
        break;
      case "parent_phone":
        setFormData((prev) => ({
          ...prev,
          parent: {
            ...formData.parent,
            phone: value,
          },
        }));
        break;
      case "parent_email":
        setFormData((prev) => ({
          ...prev,
          parent: {
            ...formData.parent,
            email: value,
          },
        }));
        break;
      case "relationship":
        setFormData((prev) => ({
          ...prev,
          parent: {
            ...formData.parent,
            relationship: value,
          },
        }));
        break;
      case "parent_occupation":
        setFormData((prev) => ({
          ...prev,
          parent: {
            ...formData.parent,
            occupation: value,
          },
        }));
        break;
      default:
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    }
    // setFormData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.user.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    if (!formData.user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.user.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.student_id.trim()) {
      newErrors.student_id = "Student ID is required";
    }
    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      // Handle API errors
      if (error.errors) {
        setErrors(error.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent size="lg" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2 style={{ margin: 0 }}>
            {student ? "Edit Student" : "Add New Student"}
          </h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.user?.first_name || ""}
                  onChange={handleChange}
                  hasError={!!errors.first_name}
                  disabled={loading}
                />
                {errors.first_name && (
                  <ErrorMessage>{errors.first_name}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.user?.last_name}
                  onChange={handleChange}
                  hasError={!!errors.last_name}
                  disabled={loading}
                />
                {errors.last_name && (
                  <ErrorMessage>{errors.last_name}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.user?.email}
                  onChange={handleChange}
                  hasError={!!errors.email}
                  disabled={loading}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.user?.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="student_id">Student ID *</Label>
                <Input
                  type="text"
                  id="student_id"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  hasError={!!errors.student_id}
                  disabled={loading || !!student}
                />
                {errors.student_id && (
                  <ErrorMessage>{errors.student_id}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="admission_date">Admission Date</Label>
                <Input
                  type="date"
                  id="admission_date"
                  name="admission_date"
                  value={formData.admission_date}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="grade">Grade *</Label>
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
                <Label htmlFor="roll_number">Roll Number</Label>
                <Input
                  type="number"
                  id="roll_number"
                  name="roll_number"
                  value={formData.roll_number}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>

            <h3 style={{ marginBottom: "1rem", color: "#374151" }}>
              Parent/Guardian Information
            </h3>

            <FormRow>
              <FormGroup>
                <Label htmlFor="parent_first_name">Parent First Name</Label>
                <Input
                  type="text"
                  id="parent_first_name"
                  name="parent_first_name"
                  value={formData.parent?.first_name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="parent_last_name">Parent Last Name</Label>
                <Input
                  type="text"
                  id="parent_last_name"
                  name="parent_last_name"
                  value={formData.parent?.last_name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="parent_phone">Parent Phone</Label>
                <Input
                  type="tel"
                  id="parent_phone"
                  name="parent_phone"
                  value={formData.parent?.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label htmlFor="parent_email">Parent Email</Label>
                <Input
                  type="email"
                  id="parent_email"
                  name="parent_email"
                  value={formData.parent?.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="parent_occupation">Parent Occupation</Label>
                <Input
                  type="text"
                  id="parent_occupation"
                  name="parent_occupation"
                  value={formData.parent?.occupation}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label htmlFor="relationship">Relationship</Label>
              <Select
                id="relationship"
                name="relationship"
                value={formData.parent?.relationship}
                onChange={handleChange}
                hasError={!!errors.relationship}
                disabled={loading}
              >
                <option value="">Select Relationship</option>
                {relationship.map((relationship) => (
                  <option key={relationship.name} value={relationship.name}>
                    {relationship.label}
                  </option>
                ))}
              </Select>
              {errors.grade && <ErrorMessage>{errors.grade}</ErrorMessage>}
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading
              ? "Saving..."
              : student
              ? "Update Student"
              : "Create Student"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};
