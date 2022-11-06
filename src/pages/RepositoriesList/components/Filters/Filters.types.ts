export interface FilterValuesState {
  min?: number;
  max?: number;
  name?: string;
}

export interface FilterErrorsState {
  name: string | null;
  minMax: string | null;
}

export interface IsValidState {
  name: boolean;
  minMax: boolean;
}

export interface FilterChangeEvent {
  target: { value: string };
}

export type FilterType = "name" | "min" | "max";

export interface FiltersProps {
  onFiltersChange: (newFilters: FilterValuesState) => void;
}
