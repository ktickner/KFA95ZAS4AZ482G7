import { styled } from "@mui/system";

const MessageBox = styled("div")`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(10)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: center;
  justify-content: center;
`;

export default MessageBox;
