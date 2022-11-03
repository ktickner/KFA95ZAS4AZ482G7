import { styled } from "@mui/system";
import Link from "@mui/material/Link";

export const Container = styled("div")`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-direction: column;
  justify-items: baseline;
  align-items: center;
`;

export const RetryLink = styled(Link)<{ component: string }>`
  vertical-align: baseline;
`;
