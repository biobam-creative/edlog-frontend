import styled from "styled-components";

export const ReportCardContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media print {
    box-shadow: none;
    border: none;
    padding: 0;
  }
`;

export const ReportHeader = styled.div`
  text-align: center;
  border-bottom: 3px solid #2c3e50;
  padding-bottom: 15px;
  margin-bottom: 20px;
  position: relative;
`;

export const PrintButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 16px;
  background: ${(props) => (props.primary ? "#2c3e50" : "#3498db")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.primary ? "#1a252f" : "#2980b9")};
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }

  @media print {
    display: none;
  }
`;

export const SchoolName = styled.h1`
  color: #2c3e50;
  margin: 10px 0;
  font-size: 24px;
`;

export const ReportTitle = styled.h2`
  color: #2c3e50;
  margin: 5px 0;
  font-size: 18px;
  text-transform: uppercase;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${(props) => (props.highlight ? "#ecf0f1" : "white")};
`;

export const InfoLabel = styled.span`
  font-weight: bold;
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

export const InfoValue = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
`;

export const SectionTitle = styled.h3`
  text-align: center;
  background: #2c3e50;
  color: white;
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
`;

export const ScoresTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: 20px 0;

  th {
    background: #34495e;
    color: white;
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
    font-weight: 600;
  }

  td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background: #f9f9f9;
  }

  tbody tr:hover {
    background: #ecf0f1;
  }
`;

export const SummarySection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
`;

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span:first-child {
    font-weight: bold;
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
    text-align: center;
  }

  span:last-child {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
  }
`;

export const RemarksSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 30px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RemarkBox = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RemarkTitle = styled.h4`
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
  margin-bottom: 15px;
`;

export const NextTerm = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 15px;
  background: #ecf0f1;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: bold;
`;

export const SkillsBehaviourContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 30px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  align-items: start;
`;

export const BehaviourGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  align-items: start;
`;

export const RatingStars = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

export const Star = styled.span`
  color: ${(props) => (props.filled ? "#f39c12" : "#ddd")};
  font-size: 18px;
  transition: color 0.3s;
`;

export const KeyRatings = styled.div`
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
`;

export const KeyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

export const KeyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const RatingNumber = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #3498db;
  min-width: 30px;
`;

export const Footer = styled.div`
  text-align: center;
  padding: 20px;
  border-top: 1px solid #ddd;
  margin-top: 30px;
  color: #666;
  font-size: 14px;
`;

export const Loading = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Error = styled.div`
  text-align: center;
  padding: 50px;
  color: #e74c3c;
  font-size: 18px;
  background: #fdf2f2;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 20px;
`;

export const EmailNotification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: ${(props) => (props.sent ? "#d4edda" : "#fff3cd")};
  border: 1px solid ${(props) => (props.sent ? "#c3e6cb" : "#ffeaa7")};
  border-radius: 4px;
  margin: 20px 0;
`;

export const EmailStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-weight: ${(props) => (props.bold ? "bold" : "normal")};
    color: ${(props) => (props.success ? "#155724" : "#856404")};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  justify-content: flex-end;
`;

export const NotificationMessage = styled.div`
  padding: 15px;
  background: ${(props) => (props.success ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.success ? "#155724" : "#721c24")};
  border: 1px solid ${(props) => (props.success ? "#c3e6cb" : "#f5c6cb")};
  border-radius: 4px;
  margin: 10px 0;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
