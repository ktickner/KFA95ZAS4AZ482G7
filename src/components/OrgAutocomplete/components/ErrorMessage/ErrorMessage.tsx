import Typography from "@mui/material/Typography";

import * as S from "./ErrorMessage.styles";

interface OrgAutocompleteErrorMessageProps {
  error: any;
  onRetryClick: () => void;
}

const OrgAutocompleteErrorMessage: React.FC<
  OrgAutocompleteErrorMessageProps
> = ({ error, onRetryClick }) => {
  return (
    <S.Container>
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
    </S.Container>
  );
};

export default OrgAutocompleteErrorMessage;
