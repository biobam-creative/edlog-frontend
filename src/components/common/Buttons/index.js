// src/components/common/Buttons/index.js
import styled, { css } from "styled-components";

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => {
    switch (props.size) {
      case "sm":
        return `${props.theme.spacing.xs} ${props.theme.spacing.sm}`;
      case "lg":
        return `${props.theme.spacing.md} ${props.theme.spacing.lg}`;
      default:
        return `${props.theme.spacing.sm} ${props.theme.spacing.md}`;
    }
  }};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: 500;
  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return props.theme.typography.small;
      case "lg":
        return props.theme.typography.body;
      default:
        return props.theme.typography.small;
    }
  }};
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const primaryStyles = css`
  background-color: ${(props) => props.theme.colors.teal};
  color: ${(props) => props.theme.colors.navy};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.slate};
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const secondaryStyles = css`
  background-color: #ffffff33;
  color: ${(props) => props.theme.colors.slate};
  border: 1px solid ${(props) => props.theme.colors.slate};

  &:hover:not(:disabled) {
    background-color: #ffffff1a;
    color: ${(props) => props.theme.colors.text.inverse};
    border: 1px solid ${(props) => props.theme.colors.slate};
  }
`;

const dangerStyles = css`
  background-color: ${(props) => props.theme.colors.error};
  color: ${(props) => props.theme.colors.text.inverse};

  &:hover:not(:disabled) {
    background-color: #dc2626;
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const getVariantStyles = (variant) => {
  switch (variant) {
    case "secondary":
      return secondaryStyles;
    case "danger":
      return dangerStyles;
    default:
      return primaryStyles;
  }
};

export const StyledButton = styled.button`
  ${buttonStyles}
  ${(props) => getVariantStyles(props.variant)}
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => {
    switch (props.size) {
      case "sm":
        return "32px";
      case "lg":
        return "48px";
      default:
        return "40px";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "sm":
        return "32px";
      case "lg":
        return "48px";
      default:
        return "40px";
    }
  }};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: transparent;
  color: ${(props) => props.theme.colors.text.secondary};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.surfaceDark};
    color: ${(props) => props.theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;

  ${(props) =>
    props.direction === "vertical" &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
`;

export const Button = styled.button``;
