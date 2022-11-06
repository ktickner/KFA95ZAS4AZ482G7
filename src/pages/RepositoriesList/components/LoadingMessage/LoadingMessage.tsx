import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { MessageBox } from "../MessageBox";

const RepositoriesListLoadingMessage: React.FC = () => {
  return (
    <MessageBox>
      <CircularProgress />
      <Typography>Loading repositories...</Typography>
    </MessageBox>
  );
};

export default RepositoriesListLoadingMessage;
