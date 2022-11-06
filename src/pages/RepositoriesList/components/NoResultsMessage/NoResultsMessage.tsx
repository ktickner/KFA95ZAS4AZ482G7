import Typography from "@mui/material/Typography";

import { MessageBox } from "../MessageBox";

import * as S from "./NoResultsMessage.styles";

const RepositoriesListNoResultsMessage: React.FC = () => {
  return (
    <MessageBox>
      <Typography variant="h1">😶</Typography>
      <S.TextContainer>
        <Typography variant="h3" textAlign="center">
          This Organisation has no repos.
        </Typography>
        <Typography textAlign="center">
          Weird, but okay. Try searching for another (better) organisation.
        </Typography>
      </S.TextContainer>
    </MessageBox>
  );
};

export default RepositoriesListNoResultsMessage;
