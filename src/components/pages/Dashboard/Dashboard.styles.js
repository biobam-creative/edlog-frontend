// src/pages/Dashboard/Dashboard.styles.js
import styled, { css } from "styled-components";
import { Card, StatCard } from "../../common/Cards";

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
    align-items: stretch;
  }
`;

export const WelcomeSection = styled.div`
  flex: 1;
`;

export const QuickActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: stretch;

    button {
      flex: 1;
    }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const DashboardStatCard = styled(StatCard)`
  text-align: left;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background-color: ${(props) => props.color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: 1.5rem;
`;

export const StatContent = styled.div`
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: ${(props) => props.theme.typography.h3};
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

export const RecentActivityCard = styled(Card)`
  grid-column: 1 / -1;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
`;

export const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.surfaceDark};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityTitle = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const ActivityTime = styled.div`
  font-size: ${(props) => props.theme.typography.small};
  color: ${(props) => props.theme.colors.text.light};
`;
