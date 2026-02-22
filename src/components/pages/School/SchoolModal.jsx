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
  Label,
  Select,
  Button,
  ErrorMessage,
} from "../../common";

export const SchoolModal = ({ isOpen, onClose, onSave, school }) => {
  const [formData, setFormData] = useState({
    admin: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    name: "",
    logo: "",
    address: "",
    headteacher_sign: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (school) {
      setFormData({
        admin: {
          first_name: school.admin?.first_name || "",
          last_name: school.admin?.last_name || "",
          email: school.admin?.email || "",
          phone: school.admin?.phone || "",
        },
        name: school.name || "",
        address: school.address || "",
        logo: school.logo || "",
        headteacher_sign: school.headteacher_sign || "",
      });
      console.log(formData);
    } else {
      setFormData({
        admin: {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
        },
        name: "",
        address: "",
        logo: "",
        headteacher_sign: "",
      });
    }
    setErrors({});
  }, [school, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "first_name":
        setFormData((prev) => ({
          ...prev,
          admin: {
            ...formData.admin,
            first_name: value,
          },
        }));
        break;
      case "last_name":
        setFormData((prev) => ({
          ...prev,
          admin: {
            ...formData.admin,
            last_name: value,
          },
        }));
        break;
      case "email":
        setFormData((prev) => ({
          ...prev,
          admin: {
            ...formData.admin,
            email: value,
          },
        }));
        break;
      case "phone":
        setFormData((prev) => ({
          ...prev,
          admin: {
            ...formData.admin,
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

    if (!formData.admin.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.admin.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    if (!formData.admin.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.admin.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.name.trim()) {
      newErrors.student_id = "Student ID is required";
    }
    if (!formData.address.trim()) {
      newErrors.grade = "Grade is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // if (!validateForm()) {
    //   return;
    // }

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
            {school ? "Edit School" : "Add New School"}
          </h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: "1rem", color: "#374151" }}>
              School Admin Details
            </h3>
            <FormRow>
              <FormGroup>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.admin?.first_name || ""}
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
                  value={formData.admin?.last_name}
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
                  value={formData.admin?.email}
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
                  value={formData.admin?.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>

            <h3 style={{ marginBottom: "1rem", color: "#374151" }}>
              School Information
            </h3>

            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  hasError={!!errors.name}
                  disabled={loading}
                />
                {errors.student_id && (
                  <ErrorMessage>{errors.name}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="logo">Logo</Label>
                <Input
                  type="file"
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="">HeadTeacher's Sign</Label>
                <Input
                  type="file"
                  id="headteacher_sign"
                  name="headteacher_sign"
                  value={formData.headteacher_sign}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </FormRow>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : school ? "Update School" : "Create School"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};
