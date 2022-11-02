import Typography from "@mui/material/Typography";

import * as S from "./SearchOrganisation.styles";

const SearchOrganisationPage: React.FC = () => {
  return (
    <S.Container>
      <Typography variant="h1">👀</Typography>
      <S.TextContainer>
        <Typography variant="h3" textAlign="center">
          Welcome to the repo search.
        </Typography>
        <Typography textAlign="center">
          Try using the search box in the AppBar above to search for an
          Organisation and view their repositories.
        </Typography>
      </S.TextContainer>
    </S.Container>
  );
};

export default SearchOrganisationPage;
