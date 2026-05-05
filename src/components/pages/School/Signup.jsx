import React, { useState } from "react";
import { financeService } from "../../../services";
import {
  PageContainer,
  Heading2,
  Button,
  Form,
  FormGroup,
  FormRow,
  Input,
  Label,
  ErrorMessage,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../common";

export default function Signup() {
  const [school, setSchool] = useState({ name: "", email: "", address: "" });
  const [admin, setAdmin] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = { school, admin };
      const data = await financeService.initiateSchoolSignup(payload);
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError("Payment initialization failed");
      }
    } catch (err) {
      setError(err.error || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        minWidth: "100vw",
        justifyContent: "center",
        backgroundColor: "#1a2b4c",
      }}
    >
      <PageContainer
        style={{
          maxWidth: 880,
          marginTop: 40,
          padding: 24,
          borderRadius: 8,
        }}
      >
        <Card>
          <CardHeader>
            <Heading2>Register Your School</Heading2>
            <div style={{ fontSize: 14, color: "#64748b" }}>
              Create an admin account and pay the signup fee to activate access.
            </div>
          </CardHeader>
          <CardBody>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
              <FormRow columns={"1fr 1fr"}>
                <FormGroup>
                  <Label>School Name</Label>
                  <Input
                    value={school.name}
                    onChange={(e) =>
                      setSchool({ ...school, name: e.target.value })
                    }
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>School Email</Label>
                  <Input
                    type="email"
                    value={school.email}
                    onChange={(e) =>
                      setSchool({ ...school, email: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>School Address</Label>
                <Input
                  value={school.address}
                  onChange={(e) =>
                    setSchool({ ...school, address: e.target.value })
                  }
                />
              </FormGroup>

              <FormRow columns={"1fr 1fr"}>
                <FormGroup>
                  <Label>Admin First Name</Label>
                  <Input
                    value={admin.first_name}
                    onChange={(e) =>
                      setAdmin({ ...admin, first_name: e.target.value })
                    }
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Admin Last Name</Label>
                  <Input
                    value={admin.last_name}
                    onChange={(e) =>
                      setAdmin({ ...admin, last_name: e.target.value })
                    }
                  />
                </FormGroup>
              </FormRow>

              <FormRow columns={"1fr 1fr"}>
                <FormGroup>
                  <Label>Admin Email</Label>
                  <Input
                    type="email"
                    value={admin.email}
                    onChange={(e) =>
                      setAdmin({ ...admin, email: e.target.value })
                    }
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    value={admin.phone}
                    onChange={(e) =>
                      setAdmin({ ...admin, phone: e.target.value })
                    }
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={admin.password}
                  onChange={(e) =>
                    setAdmin({ ...admin, password: e.target.value })
                  }
                  required
                />
              </FormGroup>

              <CardFooter
                style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}
              >
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => (window.location.href = "/")}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Starting payment..." : "Sign up and pay ₦10,000"}
                </Button>
              </CardFooter>
            </Form>
          </CardBody>
        </Card>
      </PageContainer>
    </div>
  );
}
