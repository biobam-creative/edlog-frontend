// src/components/common/Table/Table.styles.js
import styled from 'styled-components';

export const TableContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: ${props => props.theme.colors.surfaceDark};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const TableHeaderCell = styled.th`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.small};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => props.sortable && css`
    cursor: pointer;
    user-select: none;
    
    &:hover {
      background-color: ${props.theme.colors.border};
    }
  `}
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: background-color 0.2s ease-in-out;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.surfaceDark};
  }
`;

export const TableCell = styled.td`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.body};
  
  ${props => props.actions && css`
    text-align: right;
    white-space: nowrap;
  `}
`;

export const EmptyState = styled.div`
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
`;

export const LoadingState = styled.div`
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
`;