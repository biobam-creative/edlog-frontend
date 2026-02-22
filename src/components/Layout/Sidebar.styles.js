// src/components/Layout/Sidebar.styles.js
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Sidebar = styled.aside`
  width: 280px;
  background-color: ${(props) => props.theme.colors.surface};
  border-right: 1px solid ${(props) => props.theme.colors.border};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: ${(props) =>
      props.isOpen ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none"};
  }
`;

export const SidebarHeader = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surfaceDark};
  height: 80px;
  display: flex;
  align-items: center;
`;

export const SidebarNav = styled.nav`
  padding: ${(props) => props.theme.spacing.lg} 0;
  overflow-y: auto;
`;

export const NavSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const NavSectionTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.small};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all 0.2s ease-in-out;
  border-left: 3px solid transparent;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.surfaceDark};
    text-decoration: none;
  }

  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.colors.primary};
      background-color: ${props.theme.colors.surfaceDark};
      border-left-color: ${props.theme.colors.primary};
      font-weight: 500;
    `}
`;

export const NavIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

export const MainContent = styled.main`
  margin-left: 280px;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

export const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }
`;

export const SidebarFooter = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surfaceDark};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text.inverse};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${(props) => props.theme.typography.tiny};
`;

export const UserDetails = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.typography.small};
`;

export const UserRole = styled.div`
  color: ${(props) => props.theme.colors.text.light};
  font-size: ${(props) => props.theme.typography.tiny};
  text-transform: capitalize;
`;
