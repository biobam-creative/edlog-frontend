// src/pages/Assignments/Assignments.styles.js
import styled from "styled-components";
import { Card } from "../../common/Cards";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
    align-items: stretch;
  }
`;

export const FiltersBar = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const AssignmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const AssignmentCard = styled(Card)`
  padding: ${(props) => props.theme.spacing.lg};
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

export const AssignmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const AssignmentInfo = styled.div`
  flex: 1;
`;

export const AssignmentTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.h5};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const AssignmentMeta = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.typography.small};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const AssignmentStatus = styled.span`
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.typography.tiny};
  font-weight: 600;
  text-transform: uppercase;

  ${(props) => {
    switch (props.status) {
      case "published":
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case "draft":
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
      case "graded":
        return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

export const AssignmentDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
  line-height: 1.5;
`;

export const AssignmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const DetailLabel = styled.span`
  font-size: ${(props) => props.theme.typography.tiny};
  color: ${(props) => props.theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.span`
  font-size: ${(props) => props.theme.typography.small};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

export const SubmissionStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.surfaceDark};
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const StatsItem = styled.div`
  text-align: center;
`;

export const StatsValue = styled.div`
  font-size: ${(props) => props.theme.typography.h5};
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const StatsLabel = styled.div`
  font-size: ${(props) => props.theme.typography.tiny};
  color: ${(props) => props.theme.colors.text.secondary};
  text-transform: uppercase;
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  justify-content: flex-end;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.text.secondary};
`;
