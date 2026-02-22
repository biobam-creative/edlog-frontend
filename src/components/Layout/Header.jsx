// src/components/Layout/Header.js
import styled from 'styled-components';
import { FlexContainer } from '../common/Layout/Container';

export const Header = styled.header`
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContent = styled(FlexContainer)`
  padding: ${props => props.theme.spacing.md} 0;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-size: ${props => props.theme.typography.h4};
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  
  span {
    color: ${props => props.theme.colors.text.primary};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

export const NavLink = styled.a`
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.surfaceDark};
  }
  
  ${props => props.active && css`
    color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.surfaceDark};
  `}
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text.inverse};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${props => props.theme.typography.small};
`;