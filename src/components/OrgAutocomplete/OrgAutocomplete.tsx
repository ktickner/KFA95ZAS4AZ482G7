import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "lodash/debounce";

import { githubMethods } from "../../data/github";

import { OrgAutocompleteErrorMessage } from "./components/ErrorMessage";
import { OrgAutocompleteLoadingMessage } from "./components/LoadingMessage";
import { OrgAutocompleteNoOptionsMessage } from "./components/NoOptionsMessage";
import { OrgAutocompleteNoSearchMessage } from "./components/NoSearchMessage";

import type {
  OrgAutocompleteProps,
  OctokitUserData,
} from "./OrgAutocomplete.types";

const OrgAutocomplete: React.FC<OrgAutocompleteProps> = ({
  onOrganizationSelect,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(new Error("lol"));
  const [value, setValue] = React.useState<OctokitUserData | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [options, setOptions] = React.useState<OctokitUserData[]>([]);

  const fetchOptions = React.useMemo(
    () =>
      debounce(async (input: string) => {
        try {
          const orgs = await githubMethods.searchOrgs({ searchString: input });

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
      setOptions(value ? [value] : []);

      setIsLoading(false);

      return;
    }

    fetchOptions(inputValue);
  }, [inputValue, fetchOptions, value]);

  function handleRetry() {
    setIsLoading(true);
    setError(null);

    fetchOptions(inputValue);
  }

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
        setError(null);

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
          <OrgAutocompleteErrorMessage
            error={error}
            onRetryClick={handleRetry}
          />
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
