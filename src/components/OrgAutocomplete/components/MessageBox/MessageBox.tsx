import { styled } from "@mui/system";

// A bit inconsistent with the file design here but there wasn't any point in creating a component just for this
// Keeping the directory the same will make it easier to extend in the future
const Container = styled("div")`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;
  justify-items: baseline;
  align-items: center;
`;

export default Container;
