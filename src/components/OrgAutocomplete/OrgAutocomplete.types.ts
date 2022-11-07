export interface OrgAutocompleteProps extends React.PropsWithChildren {
  onOrganizationSelect: (value: OctokitUserData | null) => void;
}

// Apparently the Octokit types are not great, and I can't find documentation about a
// `User` or `Organization` type
export interface OctokitUserData {
  login: string;
  id: number;
}
