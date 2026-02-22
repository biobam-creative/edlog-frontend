import styled from "styled-components";

// Input Form Components
export const InputFormContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FormSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const FormButton = styled.button`
  padding: 12px 24px;
  background: ${(props) =>
    props.variant === "primary"
      ? "#3498db"
      : props.variant === "success"
        ? "#2ecc71"
        : props.variant === "warning"
          ? "#f39c12"
          : props.variant === "danger"
            ? "#e74c3c"
            : "#95a5a6"};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${(props) =>
      props.variant === "primary"
        ? "#2980b9"
        : props.variant === "success"
          ? "#27ae60"
          : props.variant === "warning"
            ? "#d68910"
            : props.variant === "danger"
              ? "#c0392b"
              : "#7f8c8d"};
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }

  & + & {
    margin-left: 10px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

// Table Components
export const InputTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 13px;
`;

export const TableHeader = styled.thead`
  background: #2c3e50;
  color: white;

  th {
    padding: 12px 8px;
    text-align: left;
    font-weight: 600;
    border-right: 1px solid #34495e;

    &:last-child {
      border-right: none;
    }
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #eee;

    &:nth-child(even) {
      background: #f9f9f9;
    }

    &:hover {
      background: #ecf0f1;
    }
  }

  td {
    padding: 10px 8px;
    border-right: 1px solid #eee;

    &:last-child {
      border-right: none;
    }
  }
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export const TableSelect = styled.select`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;
  background: white;
`;

// Card Components
export const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${(props) => props.color || "#3498db"};
`;

export const CardTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 16px;
`;

export const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 15px;
  background: ${(props) => (props.highlight ? "#ecf0f1" : "#f8f9fa")};
  border-radius: 4px;

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 12px;
    color: #7f8c8d;
    text-transform: uppercase;
  }
`;

// Tabs Components
export const TabsContainer = styled.div`
  margin-bottom: 20px;
`;

export const TabsHeader = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 12px 24px;
  background: ${(props) => (props.active ? "#2c3e50" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#7f8c8d")};
  border: none;
  border-radius: 4px 4px 0 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.active ? "#2c3e50" : "#f5f5f5")};
  }

  & + & {
    margin-left: 2px;
  }
`;

export const TabContent = styled.div`
  padding: 20px 0;
`;

// Alert Components
export const Alert = styled.div`
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  background: ${(props) =>
    props.type === "success"
      ? "#d4edda"
      : props.type === "error"
        ? "#f8d7da"
        : props.type === "warning"
          ? "#fff3cd"
          : "#d1ecf1"};
  color: ${(props) =>
    props.type === "success"
      ? "#155724"
      : props.type === "error"
        ? "#721c24"
        : props.type === "warning"
          ? "#856404"
          : "#0c5460"};
  border: 1px solid
    ${(props) =>
      props.type === "success"
        ? "#c3e6cb"
        : props.type === "error"
          ? "#f5c6cb"
          : props.type === "warning"
            ? "#ffeaa7"
            : "#bee5eb"};
`;

// Rating Components
export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RatingButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.active ? "#3498db" : "#ddd")};
  background: ${(props) => (props.active ? "#3498db" : "white")};
  color: ${(props) => (props.active ? "white" : "#7f8c8d")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #3498db;
    background: ${(props) => (props.active ? "#2980b9" : "#ecf0f1")};
  }
`;

// Progress Bar
export const ProgressBar = styled.div`
  height: 10px;
  background: #ecf0f1;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${(props) =>
    props.percentage >= 80
      ? "#2ecc71"
      : props.percentage >= 60
        ? "#3498db"
        : props.percentage >= 40
          ? "#f39c12"
          : "#e74c3c"};
  width: ${(props) => props.percentage}%;
  transition: width 0.3s ease;
`;
