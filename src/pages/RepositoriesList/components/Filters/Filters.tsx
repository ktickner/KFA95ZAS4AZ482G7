import * as React from "react";
import debounce from "lodash/debounce";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type {
  FilterErrorsState,
  FilterValuesState,
  IsValidState,
  FilterChangeEvent,
  FilterType,
  FiltersProps,
} from "./Filters.types";

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
  const [filterValues, setFilterValues] = React.useState<FilterValuesState>({});
  const [filterErrors, setFilterErrors] = React.useState<FilterErrorsState>({
    name: null,
    minMax: null,
  });
  const [isValid, setIsValid] = React.useState<IsValidState>({
    name: true,
    minMax: true,
  });

  function validateFilters({ min, max }: FilterValuesState) {
    if (!min && !max) {
      return { isValid: { minMax: true }, messages: { minMax: null } };
    }

    if ((min && isNaN(min)) || (max && isNaN(max))) {
      return {
        isValid: { minMax: false },
        messages: { minMax: "Please enter only numbers" },
      };
    }

    if (!min || !max) {
      return { isValid: { minMax: true }, messages: { minMax: null } };
    }

    return min < max
      ? { isValid: { minMax: true }, messages: { minMax: null } }
      : {
          isValid: { minMax: false },
          messages: {
            minMax: "Minimum issues needs to be less than maximum issues",
          },
        };
  }

  const handleFilterChange = debounce(
    (event: FilterChangeEvent, filterType: FilterType) => {
      const filterValue = event.target.value;
      const newFilters = { ...filterValues, [filterType]: filterValue };

      const validation = validateFilters(newFilters);

      setFilterErrors({ ...filterErrors, ...validation.messages });
      setIsValid({ ...isValid, ...validation.isValid });

      if (!validation.isValid) {
        return;
      }

      setFilterValues(newFilters);
      onFiltersChange(newFilters);
    },
    500
  );

  return (
    <Stack width="100%" gap={2} direction="row" alignItems="center">
      <TextField
        label="Repository name"
        sx={{ flex: 1 }}
        onChange={(event) => handleFilterChange(event, "name")}
        error={!isValid.name}
        helperText={filterErrors.name}
      />
      <Typography>Stars:</Typography>
      <TextField
        label="Minimum"
        type="number"
        onChange={(event) => handleFilterChange(event, "min")}
        error={!isValid.minMax}
        helperText={filterErrors.minMax}
      />
      <TextField
        label="Maximum"
        type="number"
        onChange={(event) => handleFilterChange(event, "max")}
        error={!isValid.minMax}
      />
    </Stack>
  );
};

export default Filters;
