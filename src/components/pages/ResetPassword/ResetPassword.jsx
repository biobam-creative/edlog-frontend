import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
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
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordInputWrapper = styled.div`
  position: relative;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  font-size: 18px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #334155;
  }
`;

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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
      setValidating(false);
      return;
    }

    // Validate token
    const validateToken = async () => {
      try {
        await authService.validateResetToken(token);
        setTokenValid(true);
        setValidating(false);
      } catch (err) {
        setError(err.message || "Invalid or expired reset token");
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (formData.new_password !== formData.confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.new_password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      await authService.resetPassword({
        token,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });
      setSuccess(true);
      setFormData({ new_password: "", confirm_password: "" });
      // Redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <LoginContainer>
        <LoginCard>
          <FormTitle>Validating...</FormTitle>
          <FormDescription>
            Please wait while we verify your reset link.
          </FormDescription>
        </LoginCard>
      </LoginContainer>
    );
  }

  if (!tokenValid) {
    return (
      <LoginContainer>
        <LoginCard>
          <FormTitle>Invalid Reset Link</FormTitle>
          <FormDescription>{error}</FormDescription>
          <BackLink to="/forgot-password">Request a new reset link</BackLink>
        </LoginCard>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginLogo>
          <img src={logo} style={{ height: "60px" }} />
        </LoginLogo>

        <FormTitle>Reset Password</FormTitle>
        <FormDescription>
          Enter your new password below. Make sure it's strong and secure.
        </FormDescription>

        {success && (
          <SuccessMessage style={{ textAlign: "center", marginBottom: "16px" }}>
            Password has been reset successfully! Redirecting to login...
          </SuccessMessage>
        )}

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="new_password">New Password</Label>
            <PasswordInputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Enter your new password"
                required
                disabled={loading}
                style={{ paddingRight: "40px" }}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePasswordButton>
            </PasswordInputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <PasswordInputWrapper>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your new password"
                required
                disabled={loading}
                style={{ paddingRight: "40px" }}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePasswordButton>
            </PasswordInputWrapper>
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
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </LoginForm>

        <BackLink to="/login">Back to Login</BackLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default ResetPassword;
