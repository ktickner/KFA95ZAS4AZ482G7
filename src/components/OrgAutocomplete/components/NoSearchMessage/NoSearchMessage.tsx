import Typography from "@mui/material/Typography";

import { MessageBox } from "../MessageBox";

const OrgAutocompleteNoSearchMessage: React.FC = () => {
  return (
    <MessageBox>
      <Typography variant="h3">😎</Typography>
      <Typography>Start typing to search for an organization.</Typography>
    </MessageBox>
  );
};

export default OrgAutocompleteNoSearchMessage;
