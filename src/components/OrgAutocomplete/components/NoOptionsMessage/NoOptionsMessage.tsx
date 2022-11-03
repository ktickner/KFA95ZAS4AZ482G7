import Typography from "@mui/material/Typography";

import { MessageBox } from "../MessageBox";

const OrgAutocompleteNoOptionsMessage: React.FC = () => {
  return (
    <MessageBox>
      <Typography variant="h3">🤔</Typography>
      <Typography>
        We couldn't find any organizations. Maybe try search for something a
        little more vague.
      </Typography>
    </MessageBox>
  );
};

export default OrgAutocompleteNoOptionsMessage;
