import * as React from "react";
import { Octokit } from "octokit";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "lodash/debounce";

import { OrgAutocompleteErrorMessage } from "./components/ErrorMessage";

const OrgAutocomplete: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(new Error("theres an error"));
  const [value, setValue] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState<string>("");
  const [options, setOptions] = React.useState<string[]>([]);
  const octokit = React.useRef(
    new Octokit({
      auth: process.env.REACT_APP_GH_PAT,
    })
  );

  const fetchOptions = React.useMemo(
    () =>
      debounce(async (input: string) => {
        try {
          setIsLoading(true);

          const orgs = await octokit.current.request("GET /search/users", {
            q: `type:org ${input} in:name`,
          });

          setOptions(orgs.data?.items.map((a) => a.login) || []);
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
      setValue("");
      setOptions([]);

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
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue || "");
      }}
      noOptionsText={
        error ? (
          <OrgAutocompleteErrorMessage error={error} onRetryClick={() => {}} />
        ) : (
          "No options"
        )
      }
    />
  );
};

export default OrgAutocomplete;
