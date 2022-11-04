import { styled } from "@mui/system";
import MUIContainer from "@mui/material/Container";

export const Container = styled(MUIContainer)`
  padding: ${({ theme }) => theme.spacing(14, 0, 3)};
  min-height: 100vh;
  display: flex;
`;
