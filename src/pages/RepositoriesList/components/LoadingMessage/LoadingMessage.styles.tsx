import { styled } from "@mui/system";

export const Container = styled("div")`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(10)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;
  justify-content: center;
`;
