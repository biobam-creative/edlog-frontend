// src/pages/Finance/Finance.styles.js
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

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const FinanceStatCard = styled(Card)`
  padding: ${(props) => props.theme.spacing.lg};
  text-align: center;
  border-left: 4px solid ${(props) => props.color || props.theme.colors.primary};
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const StatLabel = styled.div`
  font-size: ${(props) => props.theme.typography.small};
  color: ${(props) => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const Tab = styled.button`
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.active &&
    `
    color: ${props.theme.colors.primary};
    border-bottom-color: ${props.theme.colors.primary};
  `}

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const InvoicesTable = styled(Card)`
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.surfaceDark};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const InvoiceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
`;

export const StatusBadge = styled.span`
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.typography.tiny};
  font-weight: 600;
  text-transform: uppercase;

  ${(props) => {
    switch (props.status) {
      case "paid":
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case "pending":
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
      case "overdue":
        return `
          background-color: #fee2e2;
          color: #dc2626;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.text.secondary};
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

export const PaymentHistory = styled.div`
  margin-top: ${(props) => props.theme.spacing.xl};
`;

export const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;
