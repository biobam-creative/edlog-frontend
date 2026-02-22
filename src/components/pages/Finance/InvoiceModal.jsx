// src/components/Finance/InvoiceModal.jsx
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
  Select,
  Button,
  ErrorMessage,
  Label,
  DateInput,
} from "../../common";

export const InvoiceModal = ({
  isOpen,
  onClose,
  onSave,
  invoice,
  students,
  academicYears,
  terms,
}) => {
  const [formData, setFormData] = useState({
    student: "",
    academic_year: "",
    term: "",
    issue_date: "",
    due_date: "",
    tuition_fee: "",
    transport_fee: "",
    lab_fee: "",
    other_charges: "",
    discount: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [feeStructure, setFeeStructure] = useState(null);

  // Mock academic years - in real app, this would come from API
  // const academicYears = [
  //   { id: "2023-2024", name: "2023-2024" },
  //   { id: "2024-2025", name: "2024-2025" },
  //   { id: "2025-2026", name: "2025-2026" },
  // ];

  useEffect(() => {
    if (invoice) {
      setFormData({
        student: invoice.student?.id || invoice.student || "",
        academic_year: invoice.academic_year || "",
        term: invoice.term || "",
        issue_date:
          invoice.issue_date || new Date().toISOString().split("T")[0],
        due_date: invoice.due_date || "",
        tuition_fee: invoice.tuition_fee || "",
        transport_fee: invoice.transport_fee || "",
        lab_fee: invoice.lab_fee || "",
        other_charges: invoice.other_charges || "",
        discount: invoice.discount || "",
        notes: invoice.notes || "",
      });
    } else {
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 30); // 30 days from today

      setFormData({
        student: "",
        academic_year: academicYears[1]?.id || "", // Default to current year
        term: terms[1]?.id || "", // Default to current year
        issue_date: today.toISOString().split("T")[0],
        due_date: dueDate.toISOString().split("T")[0],
        tuition_fee: "",
        transport_fee: "",
        lab_fee: "",
        other_charges: "",
        discount: "",
        notes: "",
      });
    }
    setErrors({});
    setFeeStructure(null);
  }, [invoice, isOpen]);

  useEffect(() => {
    if (formData.student) {
      loadFeeStructure();
    }
  }, [formData.student]);

  const loadFeeStructure = () => {
    // Mock fee structure - in real app, this would come from API
    const selectedStudent = students.find((s) => s.id == formData.student);
    if (selectedStudent) {
      const mockFeeStructure = {
        tuition_fee: 5000,
        transport_fee: 500,
        lab_fee: 300,
        other_charges: 200,
      };
      setFeeStructure(mockFeeStructure);

      // Auto-fill fees if they're empty
      setFormData((prev) => ({
        ...prev,
        tuition_fee:
          prev.tuition_fee || mockFeeStructure.tuition_fee.toString(),
        transport_fee:
          prev.transport_fee || mockFeeStructure.transport_fee.toString(),
        lab_fee: prev.lab_fee || mockFeeStructure.lab_fee.toString(),
        other_charges:
          prev.other_charges || mockFeeStructure.other_charges.toString(),
      }));
    }
  };

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

  const calculateTotal = () => {
    const tuition = parseFloat(formData.tuition_fee) || 0;
    const transport = parseFloat(formData.transport_fee) || 0;
    const lab = parseFloat(formData.lab_fee) || 0;
    const other = parseFloat(formData.other_charges) || 0;
    const discount = parseFloat(formData.discount) || 0;

    return tuition + transport + lab + other - discount;
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.student) {
      newErrors.student = "Student is required";
    }
    if (!formData.academic_year) {
      newErrors.academic_year = "Academic year is required";
    }
    if (!formData.term) {
      newErrors.term = "Term is required";
    }
    if (!formData.issue_date) {
      newErrors.issue_date = "Issue date is required";
    }
    if (!formData.due_date) {
      newErrors.due_date = "Due date is required";
    }

    // Date validation
    if (formData.issue_date && formData.due_date) {
      const issueDate = new Date(formData.issue_date);
      const dueDate = new Date(formData.due_date);
      if (dueDate < issueDate) {
        newErrors.due_date = "Due date cannot be before issue date";
      }
    }

    // Fee validation
    if (!formData.tuition_fee || parseFloat(formData.tuition_fee) < 0) {
      newErrors.tuition_fee = "Valid tuition fee is required";
    }
    if (formData.transport_fee && parseFloat(formData.transport_fee) < 0) {
      newErrors.transport_fee = "Transport fee cannot be negative";
    }
    if (formData.lab_fee && parseFloat(formData.lab_fee) < 0) {
      newErrors.lab_fee = "Lab fee cannot be negative";
    }
    if (formData.other_charges && parseFloat(formData.other_charges) < 0) {
      newErrors.other_charges = "Other charges cannot be negative";
    }
    if (formData.discount && parseFloat(formData.discount) < 0) {
      newErrors.discount = "Discount cannot be negative";
    }

    // Total amount validation
    const total = calculateTotal();
    if (total <= 0) {
      newErrors.total = "Total amount must be greater than 0";
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
      const invoiceData = {
        ...formData,
        total_amount: calculateTotal(),
        student: parseInt(formData.student),
      };
      await onSave(invoiceData);
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

  const handleApplyFeeStructure = () => {
    if (feeStructure) {
      setFormData((prev) => ({
        ...prev,
        tuition_fee: feeStructure.tuition_fee.toString(),
        transport_fee: feeStructure.transport_fee.toString(),
        lab_fee: feeStructure.lab_fee.toString(),
        other_charges: feeStructure.other_charges.toString(),
      }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (!isOpen) return null;

  const totalAmount = calculateTotal();
  const selectedStudent = students.find((s) => s.id == formData.student);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent size="lg" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2 style={{ margin: 0 }}>
            {invoice ? "Edit Invoice" : "Create New Invoice"}
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
                <Label htmlFor="student">Student *</Label>
                <Select
                  id="student"
                  name="student"
                  value={formData.student}
                  onChange={handleChange}
                  hasError={!!errors.student}
                  disabled={loading}
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.full_name} - {student.student_id} (
                      {student.grade_name})
                    </option>
                  ))}
                </Select>
                {errors.student && (
                  <ErrorMessage>{errors.student}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="academic_year">Academic Year *</Label>
                <Select
                  id="academic_year"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleChange}
                  hasError={!!errors.academic_year}
                  disabled={loading}
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.name}
                    </option>
                  ))}
                </Select>
                {errors.academic_year && (
                  <ErrorMessage>{errors.academic_year}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label htmlFor="term">Academic Year *</Label>
                <Select
                  id="term"
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  hasError={!!errors.term}
                  disabled={loading}
                >
                  <option value="">Select Term</option>
                  {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.name}
                    </option>
                  ))}
                </Select>
                {errors.term && <ErrorMessage>{errors.term}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="issue_date">Issue Date *</Label>
                <DateInput
                  id="issue_date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleChange}
                  hasError={!!errors.issue_date}
                  disabled={loading}
                />
                {errors.issue_date && (
                  <ErrorMessage>{errors.issue_date}</ErrorMessage>
                )}
              </FormGroup>

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
              Fee Details
            </h3>

            {formData.student && feeStructure && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f9ff",
                  border: "1px solid #bae6fd",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#0369a1",
                        fontWeight: "600",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Standard Fee Structure Available
                    </div>
                    <div style={{ color: "#0369a1", fontSize: "0.875rem" }}>
                      For {selectedStudent?.grade_name} -{" "}
                      {selectedStudent?.full_name}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleApplyFeeStructure}
                    disabled={loading}
                  >
                    Apply Standard Fees
                  </Button>
                </div>
              </div>
            )}

            <FormRow>
              <FormGroup>
                <Label htmlFor="tuition_fee">Tuition Fee *</Label>
                <Input
                  type="number"
                  id="tuition_fee"
                  name="tuition_fee"
                  value={formData.tuition_fee}
                  onChange={handleChange}
                  hasError={!!errors.tuition_fee}
                  disabled={loading}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.tuition_fee && (
                  <ErrorMessage>{errors.tuition_fee}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="transport_fee">Transport Fee</Label>
                <Input
                  type="number"
                  id="transport_fee"
                  name="transport_fee"
                  value={formData.transport_fee}
                  onChange={handleChange}
                  hasError={!!errors.transport_fee}
                  disabled={loading}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.transport_fee && (
                  <ErrorMessage>{errors.transport_fee}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="lab_fee">Lab Fee</Label>
                <Input
                  type="number"
                  id="lab_fee"
                  name="lab_fee"
                  value={formData.lab_fee}
                  onChange={handleChange}
                  hasError={!!errors.lab_fee}
                  disabled={loading}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.lab_fee && (
                  <ErrorMessage>{errors.lab_fee}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="other_charges">Other Charges</Label>
                <Input
                  type="number"
                  id="other_charges"
                  name="other_charges"
                  value={formData.other_charges}
                  onChange={handleChange}
                  hasError={!!errors.other_charges}
                  disabled={loading}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.other_charges && (
                  <ErrorMessage>{errors.other_charges}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="discount">Discount</Label>
                <Input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  hasError={!!errors.discount}
                  disabled={loading}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.discount && (
                  <ErrorMessage>{errors.discount}</ErrorMessage>
                )}
                <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                  Any discount or scholarship amount
                </small>
              </FormGroup>

              <FormGroup>
                <Label>Total Amount</Label>
                <div
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: totalAmount > 0 ? "#059669" : "#dc2626",
                    textAlign: "center",
                  }}
                >
                  {formatCurrency(totalAmount)}
                </div>
                {errors.total && <ErrorMessage>{errors.total}</ErrorMessage>}
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
              Additional Information
            </h3>

            <FormGroup>
              <Label htmlFor="notes">Notes</Label>
              <Input
                type="text"
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                disabled={loading}
                placeholder="Any additional notes about this invoice..."
              />
              <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                This will be displayed on the invoice
              </small>
            </FormGroup>

            {/* Invoice Preview Section */}
            {formData.student && (
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
                  Invoice Preview
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <div>Tuition Fee:</div>
                  <div>
                    {formatCurrency(parseFloat(formData.tuition_fee) || 0)}
                  </div>

                  <div>Transport Fee:</div>
                  <div>
                    {formatCurrency(parseFloat(formData.transport_fee) || 0)}
                  </div>

                  <div>Lab Fee:</div>
                  <div>{formatCurrency(parseFloat(formData.lab_fee) || 0)}</div>

                  <div>Other Charges:</div>
                  <div>
                    {formatCurrency(parseFloat(formData.other_charges) || 0)}
                  </div>

                  <div>Discount:</div>
                  <div style={{ color: "#dc2626" }}>
                    -{formatCurrency(parseFloat(formData.discount) || 0)}
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #e2e8f0",
                      paddingTop: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Total Amount:
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid #e2e8f0",
                      paddingTop: "0.5rem",
                      fontWeight: "600",
                      color: "#059669",
                    }}
                  >
                    {formatCurrency(totalAmount)}
                  </div>
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
                    {invoice ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: "0.5rem" }}>
                      {invoice ? "✏️" : "🧾"}
                    </span>
                    {invoice ? "Update Invoice" : "Create Invoice"}
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

export default InvoiceModal;
