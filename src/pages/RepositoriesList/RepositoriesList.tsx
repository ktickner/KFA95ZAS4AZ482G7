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

import { RepositoriesTableRow } from "./components/TableRow";
import { RepositoriesListTablePagination } from "./components/TablePagination";

import { githubMethods } from "../../data/github";

const RepositoriesListPage: React.FC<RepositoriesListPageProps> = ({
  orgName,
}) => {
  const [repoList, setRepoList] = React.useState<RepoData[]>([]);
  const [linkHeader, setLinkHeader] = React.useState<string | null>(null);

  const fetchRepos = React.useCallback(
    async (name: typeof orgName, page: number | undefined = 1) => {
      const repos = await githubMethods.fetchRepos({ orgName: name, page });

      setLinkHeader(repos.headers.link ?? null);
      setRepoList(repos.data as RepoData[]);
    },
    []
  );

  React.useEffect(() => {
    fetchRepos(orgName);
  }, [orgName, fetchRepos]);

  function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
    fetchRepos(orgName, page);
  }

  return (
    <Stack width="100%" gap={2} alignItems="center">
      <Paper sx={{ width: "100%", alignSelf: "flex-start" }}>
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
      </Paper>
      <RepositoriesListTablePagination
        linkHeader={linkHeader}
        onPageChange={handlePageChange}
      />
    </Stack>
  );
};

export default RepositoriesListPage;
