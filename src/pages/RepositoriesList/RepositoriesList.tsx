import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import type {
  RepositoriesListPageProps,
  RepoData,
  FetchReposParams,
} from "./RepositoriesList.types";
import { FilterValuesState } from "./components/Filters/Filters.types";

import { RepositoriesTableRow } from "./components/TableRow";
import { RepositoriesListTablePagination } from "./components/TablePagination";
import { Filters } from "./components/Filters";
import { RepositoriesListLoadingMessage } from "./components/LoadingMessage";
import { RepositoriesListNoResultsMessage } from "./components/NoResultsMessage";
import { RepositoriesListErrorMessage } from "./components/ErrorMessage";

import { githubMethods } from "../../data/github";

const RepositoriesListPage: React.FC<RepositoriesListPageProps> = ({
  orgName,
}) => {
  const [repoList, setRepoList] = React.useState<RepoData[]>([]);
  const [linkHeader, setLinkHeader] = React.useState<string | null>(null);
  const [filterValues, setFilterValues] = React.useState<FilterValuesState>({});
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // Type is any because the octokit client eats the real errors and exposes something else
  const [error, setError] = React.useState<any>(null);

  // Using a ref as this is designed just to track when the organization changes
  const currentOrgName = React.useRef<string>(orgName);

  const fetchRepos = React.useCallback(async (params: FetchReposParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const repos = await githubMethods.searchRepos(params);

      setLinkHeader(repos.headers.link ?? null);
      setRepoList(repos.data.items as RepoData[]);
      setIsLoading(false);
    } catch (error: any) {
      // This should report to error logs like Bugsnag for example
      console.error(error);

      setLinkHeader(null);
      setRepoList([]);
      setError(error);
      setIsLoading(false);

      return;
    }
  }, []);

  React.useEffect(() => {
    if (orgName !== currentOrgName.current) {
      // We just want to reset the page when the organization changes, as the current page might not exist
      // I can't decide if creating a context to manage the API state is more or less complex at this scale
      currentOrgName.current = orgName;
      setCurrentPage(1);
    }

    fetchRepos({ org: orgName, page: currentPage, ...filterValues });
  }, [orgName, fetchRepos, filterValues, currentPage]);

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
  }

  function handleFiltersChange(newFilters: FilterValuesState) {
    setCurrentPage(1);
    setFilterValues(newFilters);
  }

  function handleRetry() {
    fetchRepos({ org: orgName, page: currentPage, ...filterValues });
  }

  return (
    <Stack width="100%" gap={2} alignItems="center">
      <Filters onFiltersChange={handleFiltersChange} />
      <Paper sx={{ width: "100%", alignSelf: "flex-start" }}>
        {isLoading ? (
          <RepositoriesListLoadingMessage />
        ) : error ? (
          <RepositoriesListErrorMessage
            error={error}
            onRetryClick={handleRetry}
          />
        ) : repoList.length === 0 ? (
          <RepositoriesListNoResultsMessage />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Issues</TableCell>
                  <TableCell>Stars</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {repoList.map((repo) => (
                  <RepositoriesTableRow key={repo.id} repo={repo} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <RepositoriesListTablePagination
        linkHeader={linkHeader}
        onPageChange={handlePageChange}
      />
    </Stack>
  );
};

export default RepositoriesListPage;
