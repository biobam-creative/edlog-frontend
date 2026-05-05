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
  Select,
  TextArea,
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

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    grade: "",
  });

  useEffect(() => {
    fetchSubjects();
    fetchGrades();
  }, []);

  useEffect(() => {
    filterSubjects();
  }, [subjects, gradeFilter]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const data = await academicsService.getSubjects();
      setSubjects(data);
    } catch (err) {
      setError("Failed to fetch subjects");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGrades = async () => {
    try {
      const data = await academicsService.getGrades();
      setGrades(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGradeFilterChange = (e) => {
    setGradeFilter(e.target.value);
  };

  const filterSubjects = () => {
    let filtered = subjects;

    if (gradeFilter) {
      filtered = filtered.filter(
        (subject) => subject.grade?.toString() == gradeFilter,
      );
    }

    setFilteredSubjects(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await academicsService.updateSubject(editingId, formData);
      } else {
        await academicsService.createSubject(formData);
      }
      setFormData({ name: "", code: "", description: "", grade: "" });
      setEditingId(null);
      setShowForm(false);
      fetchSubjects();
    } catch (err) {
      setError(err.error || "Failed to save subject");
    }
  };

  const handleEdit = (subject) => {
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      grade: subject.grade,
    });
    setEditingId(subject.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await academicsService.deleteSubject(id);
        fetchSubjects();
      } catch (err) {
        setError(err.error || "Failed to delete subject");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", code: "", description: "", grade: "" });
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Subjects Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add New Subject
          </Button>
        </PageActions>
      </PageHeader>
      <FormGroup style={{ minWidth: "200px", margin: 0 }}>
        <Label>Filter by Class</Label>
        <Select value={gradeFilter} onChange={handleGradeFilterChange}>
          <option value="">All Classes</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      {showForm && (
        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>
            <Heading2>
              {editingId ? "Edit Subject" : "Add New Subject"}
            </Heading2>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Subject Name</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Subject Code</Label>
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
                  <Label>Grade</Label>
                  <Select
                    required
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                  >
                    <option value="">Select Grade</option>
                    {grades.map((grade) => (
                      <option key={grade.id} value={grade.id}>
                        {grade.name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
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
              <th>Code</th>
              <th>Grade</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects?.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.name}</td>
                <td>{subject.code}</td>
                <td>{subject.grade_name}</td>
                <td>
                  {subject.description
                    ? subject.description.substring(0, 50) + "..."
                    : "—"}
                </td>
                <td>
                  <CardActions>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(subject)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(subject.id)}
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

export default Subjects;
