// src/components/common/Typography/index.js
import styled from 'styled-components';

export const Heading1 = styled.h1`
  font-size: ${props => props.theme.typography.h1};
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const Heading2 = styled.h2`
  font-size: ${props => props.theme.typography.h2};
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.3;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const Heading3 = styled.h3`
  font-size: ${props => props.theme.typography.h3};
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.4;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const BodyText = styled.p`
  font-size: ${props => props.theme.typography.body};
  color: ${props => props.color || props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${props => props.marginBottom || props.theme.spacing.md};
`;

export const SmallText = styled.span`
  font-size: ${props => props.theme.typography.small};
  color: ${props => props.color || props.theme.colors.text.light};
`;

export const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.typography.small};
  font-weight: 500;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;