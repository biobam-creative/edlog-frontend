// src/components/common/Cards/index.js
import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  
  ${props => props.hoverable && css`
    &:hover {
      box-shadow: ${props.theme.shadows.md};
      transform: translateY(-2px);
    }
  `}
`;

export const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.surfaceDark};
  
  ${props => props.noBorder && css`
    border-bottom: none;
  `}
`;

export const CardBody = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

export const CardFooter = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.surfaceDark};
`;

export const StatCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  
  ${props => props.highlight && css`
    border-left: 4px solid ${props.theme.colors.primary};
  `}
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;