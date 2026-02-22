// src/components/Teachers/TeacherModal.jsx
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
  FormRow,
  Input,
  TextArea,
  Select,
  Button,
  ErrorMessage,
  Label,
  DateInput,
} from "../../common";

export const TeacherModal = ({ isOpen, onClose, onSave, teacher }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    teacher_id: "",
    qualification: "",
    specialization: "",
    joining_date: "",
    salary: "",
    address: "",
    experience: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Specialization options
  const specializationOptions = [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Arts",
    "Music",
    "Foreign Languages",
    "Special Education",
  ];

  // Qualification options
  const qualificationOptions = [
    "Bachelor of Education",
    "Master of Education",
    "PhD in Education",
    "Bachelor of Arts",
    "Bachelor of Science",
    "Master of Arts",
    "Master of Science",
    "Diploma in Education",
  ];

  useEffect(() => {
    if (teacher) {
      console.log(teacher)
      setFormData({
        first_name: teacher.first_name || "",
        last_name: teacher.last_name || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        teacher_id: teacher.teacher_id || "",
        qualification: teacher.qualification || "",
        specialization: teacher.specialization || "",
        joining_date:
          teacher.joining_date || new Date().toISOString().split("T")[0],
        salary: teacher.salary || "",
        address: teacher.address || "",
        experience: teacher.experience || "",
      });
    } else {
      setFormData({
        user: {
          first_name: "",
          last_name: "",
          user_type: "teacher",
          email: "",
          phone: "",
        },
        teacher_id: "",
        qualification: "",
        specialization: "",
        joining_date: new Date().toISOString().split("T")[0],
        salary: "",
        address: "",
        experience: "",
      });
    }
    setErrors({});
  }, [teacher, isOpen]);

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
      default:
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      // ...prev,
      // [name]: value,
    };
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

    // Required fields validation
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
    if (!formData.teacher_id.trim()) {
      newErrors.teacher_id = "Teacher ID is required";
    }
    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }
    if (!formData.specialization.trim()) {
      newErrors.specialization = "Specialization is required";
    }
    if (!formData.joining_date) {
      newErrors.joining_date = "Joining date is required";
    }

    // Salary validation
    if (formData.salary && formData.salary < 0) {
      newErrors.salary = "Salary cannot be negative";
    }

    // Experience validation
    if (formData.experience && formData.experience < 0) {
      newErrors.experience = "Experience cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    if (!validateForm()) {
      console.log('validation Error');
      console.log(errors);
      return;
    }

    setLoading(true);
    try {
      console.log(formData)
      await onSave(formData);
    } catch (error) {
      // Handle API errors
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.message) {
        setErrors({ general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const generateTeacherId = () => {
    if (!formData.teacher_id) {
      const prefix = "TCH";
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newTeacherId = `${prefix}${randomNum}`;

      setFormData((prev) => ({
        ...prev,
        teacher_id: newTeacherId,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent size="lg" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2 style={{ margin: 0 }}>
            {teacher ? "Edit Teacher" : "Add New Teacher"}
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
              Personal Information
            </h3>

            <FormRow>
              <FormGroup>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  hasError={!!errors.first_name}
                  disabled={loading}
                  placeholder="Enter first name"
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
                  value={formData.last_name}
                  onChange={handleChange}
                  hasError={!!errors.last_name}
                  disabled={loading}
                  placeholder="Enter last name"
                />
                {errors.last_name && (
                  <ErrorMessage>{errors.last_name}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  hasError={!!errors.email}
                  disabled={loading}
                  placeholder="teacher@school.edu"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="+1 (555) 123-4567"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <TextArea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter full address"
                rows={3}
              />
            </FormGroup>

            <h3
              style={{
                marginBottom: "1rem",
                color: "#374151",
                borderBottom: "2px solid #e5e7eb",
                paddingBottom: "0.5rem",
                marginTop: "2rem",
              }}
            >
              Professional Information
            </h3>

            <FormRow>
              <FormGroup>
                <Label htmlFor="teacher_id">Teacher ID *</Label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Input
                    type="text"
                    id="teacher_id"
                    name="teacher_id"
                    value={formData.teacher_id}
                    onChange={handleChange}
                    hasError={!!errors.teacher_id}
                    disabled={loading || !!teacher}
                    placeholder="e.g., TCH1234"
                    style={{ flex: 1 }}
                  />
                  {!teacher && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={generateTeacherId}
                      disabled={loading}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Generate ID
                    </Button>
                  )}
                </div>
                {errors.teacher_id && (
                  <ErrorMessage>{errors.teacher_id}</ErrorMessage>
                )}
                <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  Teacher ID will be used for login and identification
                </small>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="joining_date">Joining Date *</Label>
                <DateInput
                  id="joining_date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  hasError={!!errors.joining_date}
                  disabled={loading}
                />
                {errors.joining_date && (
                  <ErrorMessage>{errors.joining_date}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="qualification">Qualification *</Label>
                <Select
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  hasError={!!errors.qualification}
                  disabled={loading}
                >
                  <option value="">Select Qualification</option>
                  {qualificationOptions.map((qual) => (
                    <option key={qual} value={qual}>
                      {qual}
                    </option>
                  ))}
                </Select>
                {errors.qualification && (
                  <ErrorMessage>{errors.qualification}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="specialization">Specialization *</Label>
                <Select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  hasError={!!errors.specialization}
                  disabled={loading}
                >
                  <option value="">Select Specialization</option>
                  {specializationOptions.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </Select>
                {errors.specialization && (
                  <ErrorMessage>{errors.specialization}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  hasError={!!errors.experience}
                  disabled={loading}
                  placeholder="0"
                  min="0"
                  max="50"
                />
                {errors.experience && (
                  <ErrorMessage>{errors.experience}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="salary">Monthly Salary ($)</Label>
                <Input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  hasError={!!errors.salary}
                  disabled={loading}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.salary && <ErrorMessage>{errors.salary}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            {/* Additional Information Section */}
            <h3
              style={{
                marginBottom: "1rem",
                color: "#374151",
                borderBottom: "2px solid #e5e7eb",
                paddingBottom: "0.5rem",
                marginTop: "2rem",
              }}
            >
              Additional Information
            </h3>

            <FormGroup>
              <Label htmlFor="notes">Notes</Label>
              <TextArea
                id="notes"
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                disabled={loading}
                placeholder="Any additional notes about the teacher..."
                rows={3}
              />
            </FormGroup>

            {/* Auto-generated password info */}
            {!teacher && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f9ff",
                  border: "1px solid #bae6fd",
                  borderRadius: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#0369a1",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span>ℹ️</span>
                  <span>Account Information</span>
                </div>
                <p
                  style={{
                    color: "#0369a1",
                    fontSize: "0.875rem",
                    margin: 0,
                  }}
                >
                  A temporary password will be generated and sent to the
                  teacher's email address. They will be required to change it on
                  first login.
                </p>
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
              * Required fields
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
                    {teacher ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>
                      {teacher ? "✏️" : "👨‍🏫"}
                    </span>
                    {teacher ? "Update Teacher" : "Create Teacher"}
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

export default TeacherModal;
