// src/pages/Landing/Landing.styles.js
import styled, { css } from "styled-components";
import bg from "../../../assets/edlog-hero.png";

export const LandingContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.colors.navy};
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  // justify-content: flex-start;
  position: relative;
  overflow: hidden;
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/api/placeholder/1200/800") center/cover;
  opacity: 0.1;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: ${(props) => props.theme.spacing.xxl} 0;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  // text-align: center;
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  line-height: 1.1;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  opacity: 0.9;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

export const HeroImage = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 50vh;
  width: 50vw;
  max-width: 500px;
  margin-top: ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  // justify-content: center;
  flex-wrap: wrap;
`;

export const Section = styled.section`
  padding: ${(props) => props.theme.spacing.xxl} 0;
  background-color: ${(props) =>
    props.background === "light"
      ? props.theme.colors.background
      : props.theme.colors.surface};
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

export const FeatureCard = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  box-shadow: ${(props) => props.theme.shadows.lg};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${(props) => props.theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.primaryDark}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const FeatureTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.h4};
  margin-bottom: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const FeatureDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.xxl};
`;

export const StatItem = styled.div`
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: ${(props) => props.theme.spacing.sm};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const StatLabel = styled.div`
  font-size: ${(props) => props.theme.typography.h5};
  opacity: 0.9;
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

export const TestimonialCard = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

export const TestimonialText = styled.p`
  font-style: italic;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  line-height: 1.6;
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.primaryDark}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.text.inverse};
  font-weight: 600;
`;

export const AuthorInfo = styled.div``;

export const AuthorName = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const AuthorRole = styled.div`
  font-size: ${(props) => props.theme.typography.small};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const Footer = styled.footer`
  background-color: ${(props) => props.theme.colors.text.primary};
  color: ${(props) => props.theme.colors.text.inverse};
  padding: ${(props) => props.theme.spacing.xxl} 0;
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const FooterSection = styled.div``;

export const FooterTitle = styled.h4`
  color: ${(props) => props.theme.colors.text.inverse};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.typography.h5};
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.text.inverse};
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding-top: ${(props) => props.theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: ${(props) => props.theme.typography.small};
`;

export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  padding: ${(props) => props.theme.spacing.md} 0;
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xl};
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${(props) => props.theme.colors.text.navy};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.teal};
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;
