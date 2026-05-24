import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../../services";
import {
  LoginContainer,
  LoginCard,
  LoginLogo,
  LoginForm,
  FormTitle,
  FormDescription,
} from "../Login/Login.styles";
import {
  FormGroup,
  Input,
  Button,
  ErrorMessage,
  Label,
  SuccessMessage,
} from "../../common";
import logo from "../../../assets/edlog logo black.png";
import styled from "styled-components";

const BackLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
  margin-top: 16px;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await authService.requestPasswordReset({ email });
      setSuccess(true);
      setEmail("");
      // Optionally redirect after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(
        err.message || "Failed to request password reset. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginLogo>
          <img src={logo} style={{ height: "60px" }} />
        </LoginLogo>

        <FormTitle>Forgot Password?</FormTitle>
        <FormDescription>
          Enter your email address and we'll send you a link to reset your
          password.
        </FormDescription>

        {success && (
          <SuccessMessage style={{ textAlign: "center", marginBottom: "16px" }}>
            Password reset email has been sent successfully! Check your inbox.
          </SuccessMessage>
        )}

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </FormGroup>

          {error && (
            <ErrorMessage style={{ textAlign: "center" }}>{error}</ErrorMessage>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </LoginForm>

        <BackLink to="/login">Back to Login</BackLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default ForgotPassword;
