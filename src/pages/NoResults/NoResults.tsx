import Typography from "@mui/material/Typography";

import * as S from "./NoResults.styles";

const NoResultsPage: React.FC = () => {
  return (
    <S.Container>
      <Typography variant="h1">😶</Typography>
      <S.TextContainer>
        <Typography variant="h3" textAlign="center">
          This Organisation has no repos.
        </Typography>
        <Typography textAlign="center">
          Weird, but okay. Try searching for another (better) organisation.
        </Typography>
      </S.TextContainer>
    </S.Container>
  );
};

export default NoResultsPage;
