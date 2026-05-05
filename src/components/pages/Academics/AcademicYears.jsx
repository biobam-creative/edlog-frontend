import React, { useState, useEffect } from "react";
import { academicsService } from "../../../services";
import {
  Button,
  PageContainer,
  Heading1,
  Heading2,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  FormRow,
  Input,
  Label,
} from "../../common";
import {
  PageHeader,
  PageTitle,
  PageActions,
  CardActions,
} from "./Academics.styles";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th {
    background-color: ${(props) => props.theme.colors.surfaceDark};
    padding: ${(props) => props.theme.spacing.md};
    text-align: left;
    border-bottom: 2px solid ${(props) => props.theme.colors.border};
  }

  td {
    padding: ${(props) => props.theme.spacing.md};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  tr:hover {
    background-color: ${(props) => props.theme.colors.surface};
  }
`;

const CheckboxInput = styled(Input)`
  width: auto;
  cursor: pointer;
`;

const AcademicYears = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    is_current: false,
  });

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      setLoading(true);
      const data = await academicsService.getAcademicYears();
      setAcademicYears(data);
    } catch (err) {
      setError("Failed to fetch academic years");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await academicsService.updateAcademicYear(editingId, formData);
      } else {
        await academicsService.createAcademicYear(formData);
      }
      setFormData({
        name: "",
        start_date: "",
        end_date: "",
        is_current: false,
      });
      setEditingId(null);
      setShowForm(false);
      fetchAcademicYears();
    } catch (err) {
      setError(err.error || "Failed to save academic year");
    }
  };

  const handleEdit = (academicYear) => {
    setFormData({
      name: academicYear.name,
      start_date: academicYear.start_date,
      end_date: academicYear.end_date,
      is_current: academicYear.is_current,
    });
    setEditingId(academicYear.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await academicsService.deleteAcademicYear(id);
        fetchAcademicYears();
      } catch (err) {
        setError(err.error || "Failed to delete academic year");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", start_date: "", end_date: "", is_current: false });
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Academic Years Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add New Academic Year
          </Button>
        </PageActions>
      </PageHeader>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      {showForm && (
        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>
            <Heading2>
              {editingId ? "Edit Academic Year" : "Add New Academic Year"}
            </Heading2>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Academic Year Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., 2024-2025"
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>
                  <CheckboxInput
                    type="checkbox"
                    checked={formData.is_current}
                    onChange={(e) =>
                      setFormData({ ...formData, is_current: e.target.checked })
                    }
                  />{" "}
                  Set as Current Academic Year
                </Label>
              </FormGroup>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Current Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {academicYears.map((academicYear) => (
              <tr key={academicYear.id}>
                <td>{academicYear.name}</td>
                <td>
                  {new Date(academicYear.start_date).toLocaleDateString()}
                </td>
                <td>{new Date(academicYear.end_date).toLocaleDateString()}</td>
                <td>{academicYear.is_current ? "✓ Yes" : "—"}</td>
                <td>
                  <CardActions>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(academicYear)}

                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(academicYear.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </PageContainer>
  );
};

export default AcademicYears;
