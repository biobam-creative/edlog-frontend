// src/pages/Login/Login.styles.js
import styled from "styled-components";
import { Card } from "../../common/Cards";

export const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a2b4c;
  padding: ${(props) => props.theme.spacing.xl};
`;

export const LoginCard = styled(Card)`
  width: 100%;
  max-width: 440px;
  padding: ${(props) => props.theme.spacing.xxl};
  text-align: center;
`;

export const LoginLogo = styled.div`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

export const FormTitle = styled.h1`
  font-size: ${(props) => props.theme.typography.h5};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const FormDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;
