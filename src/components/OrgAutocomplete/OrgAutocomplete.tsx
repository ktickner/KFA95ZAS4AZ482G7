import * as React from "react";
import { Octokit } from "octokit";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "lodash/debounce";

import { OrgAutocompleteErrorMessage } from "./components/ErrorMessage";
import { OrgAutocompleteLoadingMessage } from "./components/LoadingMessage";
import { OrgAutocompleteNoOptionsMessage } from "./components/NoOptionsMessage";
import { OrgAutocompleteNoSearchMessage } from "./components/NoSearchMessage";

interface OrgAutocompleteProps extends React.PropsWithChildren {
  onOrganizationSelect: (value: OctokitUserData | null) => void;
}

// Apparently the Octokit types are not great, and I can't find documentation about a
// `User` or `Organization` type
interface OctokitUserData {
  login: string;
  id: number;
}

const OrgAutocomplete: React.FC<OrgAutocompleteProps> = ({
  onOrganizationSelect,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);
  const [value, setValue] = React.useState<OctokitUserData | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [options, setOptions] = React.useState<OctokitUserData[]>([]);
  const octokit = React.useRef(
    new Octokit({
      auth: process.env.REACT_APP_GH_PAT,
    })
  );

  const fetchOptions = React.useMemo(
    () =>
      debounce(async (input: string) => {
        try {
          const orgs = await octokit.current.request("GET /search/users", {
            q: `type:org ${input} in:name`,
          });

          setOptions(orgs.data?.items);
          setIsLoading(false);
        } catch (error: any) {
          // This should report to error logs like Bugsnag for example
          console.error(error);

          setOptions([]);
          setError(error);
          setIsLoading(false);

          return;
        }
      }, 500),
    []
  );

  React.useEffect(() => {
    if (!inputValue) {
      setValue(null);
      setOptions([]);

      setIsLoading(false);

      return;
    }

    fetchOptions(inputValue);
  }, [inputValue, fetchOptions]);

  return (
    <Autocomplete
      disablePortal
      loading={isLoading}
      options={options}
      value={value}
      renderInput={(params) => <TextField {...params} label="Organisation" />}
      getOptionLabel={(option) => option.login}
      onInputChange={(_, newInputValue) => {
        setIsLoading(true);
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue || null);

        onOrganizationSelect(newValue || null);
      }}
      loadingText={<OrgAutocompleteLoadingMessage />}
      noOptionsText={
        error ? (
          <OrgAutocompleteErrorMessage error={error} onRetryClick={() => {}} />
        ) : inputValue ? (
          <OrgAutocompleteNoOptionsMessage />
        ) : (
          <OrgAutocompleteNoSearchMessage />
        )
      }
    />
  );
};

export default OrgAutocomplete;
