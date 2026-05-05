// src/pages/Login/Login.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../../services";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../services/api12"
import {
  LoginContainer,
  LoginCard,
  LoginLogo,
  LoginForm,
  FormTitle,
  FormDescription,
} from "./Login.styles";
import {
  Form,
  FormGroup,
  Input,
  Button,
  ErrorMessage,
  Label,
} from "../../common";
import logo from "../../../assets/edlog logo black.png";

const Login = () => {
  const [formData, setFormData] = useState({
    // username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

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
    localStorage.clear();

    try {
      await authService.login(formData).then((response)=>{
        console.log(response)
        if (response.data){
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          login(response.data.user);
          api.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        } 
      });
      navigate("/app", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginLogo>
          <img src={logo} style={{ height: "60px" }} />
          {/* ed<span>log</span> */}
        </LoginLogo>

        <FormTitle>Welcome Back</FormTitle>
        <FormDescription>Sign in to your account</FormDescription>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </LoginForm>

        {/* <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <small style={{ color: "#64748b" }}>
            Demo Credentials: admin / admin123
          </small>
        </div> */}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
