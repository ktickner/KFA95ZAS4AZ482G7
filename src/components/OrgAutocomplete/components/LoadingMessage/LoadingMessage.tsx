import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { MessageBox } from "../MessageBox";

const OrgAutocompleteLoadingMessage: React.FC = () => {
  return (
    <MessageBox>
      <CircularProgress />
      <Typography>Loading organisations...</Typography>
    </MessageBox>
  );
};

export default OrgAutocompleteLoadingMessage;
