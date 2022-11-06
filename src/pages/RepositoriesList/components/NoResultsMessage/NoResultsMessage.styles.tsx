import { styled } from "@mui/system";

export const TextContainer = styled("div")`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
