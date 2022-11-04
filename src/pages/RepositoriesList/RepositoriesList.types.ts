export interface RepositoriesListPageProps {
  orgName: string;
}

export interface RepositoriesTableRowProps {
  repo: RepoData;
}

export interface RepoData {
  id: number;
  name: string;
  open_issues_count: number;
  stargazers_count: number;
}
