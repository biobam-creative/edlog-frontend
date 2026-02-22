// src/components/common/Layout/Container.js
import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.spacing.sm};
  }
`;

export const PageContainer = styled(Container)`
  padding-top: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.xl};
  min-height: calc(100vh - 80px);
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: ${(props) => props.gap || props.theme.spacing.md};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "flex-start"};
  flex-direction: ${(props) => props.direction || "row"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.spacing.sm};
    flex-direction: column;
    width: 100vw;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columns || "repeat(auto-fit, minmax(250px, 1fr))"};
  gap: ${(props) => props.gap || props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
