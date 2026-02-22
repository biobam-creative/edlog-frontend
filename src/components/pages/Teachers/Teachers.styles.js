// src/pages/Teachers/Teachers.styles.js
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

export const PageTitle = styled.div`
  flex: 1;
`;

export const PageActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: stretch;

    button {
      flex: 1;
    }
  }
`;

export const FiltersBar = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.body};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const TeacherCard = styled(Card)`
  padding: ${(props) => props.theme.spacing.lg};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

export const TeacherHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const TeacherAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text.inverse};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${(props) => props.theme.typography.h5};
`;

export const TeacherInfo = styled.div`
  flex: 1;
`;

export const TeacherName = styled.h3`
  font-size: ${(props) => props.theme.typography.h5};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const TeacherId = styled.p`
  font-size: ${(props) => props.theme.typography.small};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const TeacherDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const DetailLabel = styled.span`
  font-size: ${(props) => props.theme.typography.tiny};
  color: ${(props) => props.theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.span`
  font-size: ${(props) => props.theme.typography.small};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
`;

export const SubjectsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const SubjectTag = styled.span`
  background-color: ${(props) => props.theme.colors.surfaceDark};
  color: ${(props) => props.theme.colors.text.primary};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.typography.tiny};
  font-weight: 500;
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  justify-content: flex-end;
`;
