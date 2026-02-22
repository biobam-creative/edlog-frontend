// src/components/Layout/Sidebar.js
import styled from 'styled-components';

export const Sidebar = styled.aside`
  width: 280px;
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    z-index: 1000;
  }
`;

export const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.surfaceDark};
`;

export const SidebarNav = styled.nav`
  padding: ${props => props.theme.spacing.lg} 0;
`;

export const NavSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const NavSectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.small};
  font-weight: 600;
  color: ${props => props.theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
  transition: all 0.2s ease-in-out;
  border-left: 3px solid transparent;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.surfaceDark};
  }
  
  ${props => props.active && css`
    color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.surfaceDark};
    border-left-color: ${props.theme.colors.primary};
  `}
`;

export const NavIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContent = styled.main`
  margin-left: 280px;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;