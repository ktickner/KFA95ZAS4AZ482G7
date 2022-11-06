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
} from "./RepositoriesList.types";
import { FilterValuesState } from "./components/Filters/Filters.types";

import { RepositoriesTableRow } from "./components/TableRow";
import { RepositoriesListTablePagination } from "./components/TablePagination";
import { Filters } from "./components/Filters";
import { RepositoriesListLoadingMessage } from "./components/LoadingMessage";
import { RepositoriesListNoResultsMessage } from "./components/NoResultsMessage";

import { githubMethods } from "../../data/github";

interface FetchReposParams {
  org: string;
  page?: number;
  name?: string;
  min?: number;
  max?: number;
}

const RepositoriesListPage: React.FC<RepositoriesListPageProps> = ({
  orgName,
}) => {
  const [repoList, setRepoList] = React.useState<RepoData[]>([]);
  const [linkHeader, setLinkHeader] = React.useState<string | null>(null);
  const [filterValues, setFilterValues] = React.useState<FilterValuesState>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchRepos = React.useCallback(async (params: FetchReposParams) => {
    setIsLoading(true);

    const repos = await githubMethods.searchRepos(params);

    setLinkHeader(repos.headers.link ?? null);
    setRepoList(repos.data.items as RepoData[]);

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    fetchRepos({ org: orgName, ...filterValues });
  }, [orgName, fetchRepos, filterValues]);

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    fetchRepos({ org: orgName, page, ...filterValues });
  }

  function handleFiltersChange(newFilters: FilterValuesState) {
    setFilterValues(newFilters);
  }

  return (
    <Stack width="100%" gap={2} alignItems="center">
      <Filters onFiltersChange={handleFiltersChange} />
      <Paper sx={{ width: "100%", alignSelf: "flex-start" }}>
        {isLoading ? (
          <RepositoriesListLoadingMessage />
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
