// src/pages/Landing/Landing.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, FlexContainer } from "../../common/Layout/Container";
import { Button, StyledButton } from "../../common/Buttons";
import logoColor from "../../../assets/edlog logo color.png";
import {
  LandingContainer,
  HeroSection,
  HeroBackground,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CTAButtons,
  Section,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  StatsSection,
  StatItem,
  StatNumber,
  StatLabel,
  TestimonialsGrid,
  TestimonialCard,
  TestimonialText,
  TestimonialAuthor,
  AuthorAvatar,
  AuthorInfo,
  AuthorName,
  AuthorRole,
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  Copyright,
  Navbar,
  NavContent,
  NavLinks,
  NavLink,
  MobileMenuButton,
  HeroImage,
} from "./Landing.styles";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: "📊",
      title: "Smart Dashboard",
      description:
        "Get real-time insights into student performance, attendance, and school operations with our intuitive dashboard.",
    },
    {
      icon: "👥",
      title: "Student Management",
      description:
        "Easily manage student records, admissions, and academic progress all in one centralized system.",
    },
    {
      icon: "✅",
      title: "Attendance Tracking",
      description:
        "Automate attendance marking with our smart system that supports bulk operations and real-time reporting.",
    },
    {
      icon: "📝",
      title: "Assignment System",
      description:
        "Create, distribute, and grade assignments seamlessly with our integrated learning management tools.",
    },
    {
      icon: "💳",
      title: "Fee Management",
      description:
        "Streamline fee collection, generate invoices, and track payments with automated reminders.",
    },
    {
      icon: "📱",
      title: "Parent Portal",
      description:
        "Keep parents informed with real-time updates on their child's progress, attendance, and school activities.",
    },
  ];

  const testimonials = [
    {
      text: "EduManage has transformed how our school operates. The attendance system alone has saved us hours of administrative work each week.",
      author: "Sarah Johnson",
      role: "School Principal",
      initials: "SJ",
    },
    {
      text: "As a teacher, I love how easy it is to track student progress and communicate with parents. The interface is intuitive and powerful.",
      author: "Michael Chen",
      role: "Mathematics Teacher",
      initials: "MC",
    },
    {
      text: "The parent portal keeps me connected to my child's education. I can see assignments, grades, and attendance in real-time.",
      author: "Lisa Rodriguez",
      role: "Parent",
      initials: "LR",
    },
  ];

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleDemoRequest = () => {
    // In a real app, this would open a demo request form
    alert(
      "Thank you for your interest! Our team will contact you shortly to schedule a demo.",
    );
  };

  return (
    <LandingContainer>
      <Navbar>
        <Container>
          <NavContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={logoColor} alt="logo" style={{ height: "80px" }} />
            </div>

            <NavLinks>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <StyledButton
                style={{ bordderRadius: "50%" }}
                variant="primary"
                onClick={handleGetStarted}
              >
                Get Started
              </StyledButton>
            </NavLinks>

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </MobileMenuButton>
          </NavContent>
        </Container>
      </Navbar>

      <HeroSection>
        <FlexContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            margin: "2rem",
          }}
        >
          <HeroContent>
            <HeroTitle>
              Smarter School
              <span style={{ display: "block", color: "#3ACFB6" }}>
                Better Future
              </span>
            </HeroTitle>
            <HeroSubtitle>
              The all-in-one school management system that simplifies
              administrative tasks, enhances communication, and improves student
              outcomes. Join thousands of schools that trust EduManage for their
              daily operations.
            </HeroSubtitle>
            <CTAButtons>
              <StyledButton
                variant="primary"
                size="lg"
                onClick={handleGetStarted}
              >
                Get Started
              </StyledButton>
              <StyledButton
                variant="secondary"
                size="lg"
                onClick={handleDemoRequest}
              >
                Schedule Demo
              </StyledButton>
            </CTAButtons>
          </HeroContent>
          <HeroImage />
        </FlexContainer>
      </HeroSection>

      <Section id="features" background="light">
        <Container>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#1e293b",
              }}
            >
              Powerful Features for Modern Education
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Everything you need to manage your school efficiently, all in one
              platform
            </p>
          </div>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </Section>
      <Section
        style={{
          background: `#1a2b4c`,
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            Ready to Transform Your School?
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              opacity: "0.9",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            Join thousands of schools using EduManage to streamline their
            operations and enhance learning outcomes.
          </p>
          <CTAButtons>
            <StyledButton
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
            >
              Start Free Trial
            </StyledButton>
            <StyledButton
              variant="secondary"
              size="lg"
              onClick={handleDemoRequest}
            >
              Schedule Demo
            </StyledButton>
          </CTAButtons>
        </Container>
      </Section>

      <Footer>
        <Container>
          <FooterContent>
            <FooterSection>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "1rem",
                }}
              >
                ed<span style={{ color: "#0f9186" }}>log</span>
              </div>
              <p
                style={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.6" }}
              >
                The complete school management solution that empowers educators,
                engages parents, and enhances student success.
              </p>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Product</FooterTitle>
              <FooterLinks>
                <FooterLink href="#features">Features</FooterLink>
                <FooterLink href="#pricing">Pricing</FooterLink>
                <FooterLink href="#">Case Studies</FooterLink>
                <FooterLink href="#">Updates</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Company</FooterTitle>
              <FooterLinks>
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Support</FooterTitle>
              <FooterLinks>
                <FooterLink href="#">Help Center</FooterLink>
                <FooterLink href="#">Documentation</FooterLink>
                <FooterLink href="#">API Status</FooterLink>
                <FooterLink href="#">Community</FooterLink>
              </FooterLinks>
            </FooterSection>
          </FooterContent>

          <Copyright>
            &copy; 2024 EduManage. All rights reserved.
            <div style={{ marginTop: "0.5rem" }}>
              <FooterLink href="#" style={{ margin: "0 0.5rem" }}>
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" style={{ margin: "0 0.5rem" }}>
                Terms of Service
              </FooterLink>
              <FooterLink href="#" style={{ margin: "0 0.5rem" }}>
                Cookie Policy
              </FooterLink>
            </div>
          </Copyright>
        </Container>
      </Footer>
    </LandingContainer>
  );
};

export default Landing;
