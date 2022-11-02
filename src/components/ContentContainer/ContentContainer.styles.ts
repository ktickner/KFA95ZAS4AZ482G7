import { styled } from "@mui/system";
import MUIContainer from "@mui/material/Container";

export const Container = styled(MUIContainer)`
  padding-top: ${({ theme }) => theme.spacing(12)};
  min-height: 100vh;
  display: flex;
`;
