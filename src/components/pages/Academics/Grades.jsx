import React, { useState, useEffect } from "react";
import { academicsService, staffService } from "../../../services";
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
  Select,
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

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    capacity: "",
    class_teacher: "",
  });

  useEffect(() => {
    fetchGrades();
    fetchTeachers();
    console.log(teachers);
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await academicsService.getGrades();
      setGrades(data);
    } catch (err) {
      setError("Failed to fetch grades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await staffService.getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await academicsService.updateGrade(editingId, formData);
      } else {
        await academicsService.createGrade(formData);
      }
      setFormData({ name: "", code: "", capacity: "", class_teacher: "" });
      setEditingId(null);
      setShowForm(false);
      fetchGrades();
    } catch (err) {
      setError(err.error || "Failed to save grade");
    }
  };

  const handleEdit = (grade) => {
    setFormData({
      name: grade.name,
      code: grade.code,
      capacity: grade.capacity,
      class_teacher: grade.class_teacher || "",
    });
    setEditingId(grade.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await academicsService.deleteGrade(id);
        fetchGrades();
      } catch (err) {
        setError(err.error || "Failed to delete grade");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", code: "", capacity: "", class_teacher: "" });
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Grades/Classes Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add New Grade
          </Button>
        </PageActions>
      </PageHeader>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      {showForm && (
        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>
            <Heading2>{editingId ? "Edit Grade" : "Add New Grade"}</Heading2>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Grade Name</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Grade Code</Label>
                  <Input
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Capacity</Label>
                  <Input
                    type="number"
                    required
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Class Teacher</Label>
                  <Select
                    value={formData.class_teacher}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        class_teacher: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.full_name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </FormRow>
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
              <th>Code</th>
              <th>Capacity</th>
              <th>Class Teacher</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.name}</td>
                <td>{grade.code}</td>
                <td>{grade.capacity}</td>
                <td>{grade.class_teacher_name || "—"}</td>
                <td>{grade.student_count}</td>
                <td>
                  <CardActions>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(grade)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(grade.id)}
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

export default Grades;
