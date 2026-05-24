// src/components/common/Forms/index.js
import styled, { css } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

export const Label = styled.label``;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const Input = styled.input`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.body};
  background-color: ${(props) => props.theme.colors.surface};
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.surfaceDark};
    color: ${(props) => props.theme.colors.text.light};
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${props.theme.colors.error};

      &:focus {
        border-color: ${props.theme.colors.error};
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    `}
`;

export const IconInput = styled.div`
  diplay: flex;
  flex: 1;
  justify-content: space-between;
  gap: 10px;
`;

export const TextArea = styled.textarea`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.body};
  background-color: ${(props) => props.theme.colors.surface};
  transition: all 0.2s ease-in-out;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${props.theme.colors.error};

      &:focus {
        border-color: ${props.theme.colors.error};
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    `}
`;

export const Select = styled.select`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.body};
  background-color: ${(props) => props.theme.colors.surface};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${props.theme.colors.error};

      &:focus {
        border-color: ${props.theme.colors.error};
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    `}
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.typography.small};
  margin-top: ${(props) => props.theme.spacing.xs};
`;

export const SuccessMessage = styled.span`
  color: #10b981;
  font-size: ${(props) => props.theme.typography.small};
  margin-top: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background-color: #ecfdf5;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr 1fr"};
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const DateInput = styled.input.attrs({ type: "date" })`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.body};
  background-color: ${(props) => props.theme.colors.surface};
  transition: all 0.2s ease-in-out;
  font-family: inherit;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${props.theme.colors.error};

      &:focus {
        border-color: ${props.theme.colors.error};
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    `}
`;

// Export all form components
// export {
// Form,
// FormGroup,
// FormRow,
// Input,
// TextArea,
// Select,
// ErrorMessage,
// Label,
// DateInput
// };
