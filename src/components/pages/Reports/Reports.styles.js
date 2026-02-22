// src/pages/Reports/Reports.styles.js
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

export const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const ReportCard = styled(Card)`
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;

export const ReportIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${(props) => props.theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${(props) => props.color},
    ${(props) => props.color}dd
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`;

export const ReportTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.h4};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const ReportDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const FiltersSection = styled(Card)`
  padding: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const ReportPreview = styled(Card)`
  padding: ${(props) => props.theme.spacing.xl};
`;

export const ChartContainer = styled.div`
  height: 400px;
  margin: ${(props) => props.theme.spacing.lg} 0;
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${(props) => props.theme.spacing.lg};
`;

export const TableHeader = styled.th`
  background-color: ${(props) => props.theme.colors.surfaceDark};
  padding: ${(props) => props.theme.spacing.md};
  text-align: left;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const TableCell = styled.td`
  padding: ${(props) => props.theme.spacing.md};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const ExportOptions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.lg};
  justify-content: flex-end;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.text.secondary};
`;
