import { styled } from "@mui/system";

export const Container = styled("div")`
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacing(10)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled("div")`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
