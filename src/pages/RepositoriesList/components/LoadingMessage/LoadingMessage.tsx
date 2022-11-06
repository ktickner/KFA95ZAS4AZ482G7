import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import * as S from "./LoadingMessage.styles";

const RepositoriesListLoadingMessage: React.FC = () => {
  return (
    <S.Container>
      <CircularProgress />
      <Typography>Loading repositories...</Typography>
    </S.Container>
  );
};

export default RepositoriesListLoadingMessage;
