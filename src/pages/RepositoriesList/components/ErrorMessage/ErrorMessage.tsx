import Typography from "@mui/material/Typography";

import { MessageBox } from "../MessageBox";

import * as S from "./ErrorMessage.styles";

interface RepositoriesListErrorMessageProps {
  error: any;
  onRetryClick: () => void;
}

const RepositoriesListErrorMessage: React.FC<
  RepositoriesListErrorMessageProps
> = ({ error, onRetryClick }) => {
  return (
    <MessageBox>
      <Typography variant="h3">😱</Typography>
      {error.code >= 500 ? (
        <Typography>
          There was an unknown error. Please check your internet connection and
          <S.RetryLink
            component="button"
            variant="body1"
            underline="none"
            onClick={onRetryClick}
          >
            try again
          </S.RetryLink>
          .
        </Typography>
      ) : (
        <Typography>
          There was an error with the following message: {error.message}. <br />
          Our team has been notified and are looking into it. Maybe{" "}
          <S.RetryLink
            component="button"
            variant="body1"
            underline="none"
            onClick={onRetryClick}
          >
            try again
          </S.RetryLink>
          .
        </Typography>
      )}
    </MessageBox>
  );
};

export default RepositoriesListErrorMessage;
