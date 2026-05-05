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

const Terms = () => {
  const [terms, setTerms] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    academic_year: "",
    next_term_begins: "",
  });

  useEffect(() => {
    fetchTerms();
    fetchAcademicYears();
    console.log(terms);
  }, [setTerms]);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      const data = await academicsService.getTerms();
      setTerms(data);
    } catch (err) {
      setError("Failed to fetch terms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      const data = await academicsService.getAcademicYears();
      setAcademicYears(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setError("");
    try {
      if (editingId) {
        await academicsService.updateTerm(editingId, formData);
      } else {
        await academicsService.createTerm(formData);
      }
      setFormData({
        name: "",
        start_date: "",
        end_date: "",
        academic_year: "",
        next_term_begins: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchTerms();
    } catch (err) {
      setError(err.error || "Failed to save term");
    }
  };

  const handleEdit = (term) => {
    setFormData({
      name: term.name,
      start_date: term.start_date,
      end_date: term.end_date,
      academic_year: term.academic_year?.id || "",
      next_term_begins: term.next_term_begins || "",
    });
    setEditingId(term.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await academicsService.deleteTerm(id);
        fetchTerms();
      } catch (err) {
        setError(err.error || "Failed to delete term");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      start_date: "",
      end_date: "",
      academic_year: "",
      next_term_begins: "",
    });
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Terms Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add New Term
          </Button>
        </PageActions>
      </PageHeader>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      {showForm && (
        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>
            <Heading2>{editingId ? "Edit Term" : "Add New Term"}</Heading2>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Term Name</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Academic Year</Label>
                  <Select
                    required
                    value={formData.academic_year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        academic_year_id: e.target.value,
                        academic_year: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </FormRow>
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
                <Label>Next Term Begins</Label>
                <Input
                  type="date"
                  value={formData.next_term_begins}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      next_term_begins: e.target.value,
                    })
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
                <Button variant="danger" type="button" onClick={handleCancel}>
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
              <th>Academic Year</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Next Term Begins</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {terms.map((term) => (
              <tr key={term.id}>
                <td>{term.name}</td>
                <td>{term.academic_year?.name}</td>
                <td>{term.start_date}</td>
                <td>{term.end_date}</td>
                <td>{term.next_term_begins || "—"}</td>
                <td>
                  <CardActions>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(term)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(term.id)}
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

export default Terms;
