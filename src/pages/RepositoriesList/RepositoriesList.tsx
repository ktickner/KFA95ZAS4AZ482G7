import * as React from "react";
import { Octokit } from "octokit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import type {
  RepositoriesListPageProps,
  RepoData,
} from "./RepositoriesList.types";

import { RepositoriesTableRow } from "./components/TableRow";

const RepositoriesListPage: React.FC<RepositoriesListPageProps> = ({
  orgName,
}) => {
  const [repoList, setRepoList] = React.useState<RepoData[]>([]);
  const octokit = React.useRef(
    new Octokit({
      auth: process.env.REACT_APP_GH_PAT,
    })
  );

  const fetchRepos = React.useCallback(async (name: typeof orgName) => {
    const repos = await octokit.current.request("GET /orgs/{org}/repos", {
      org: name,
    });

    console.log(repos);
    setRepoList(repos.data as RepoData[]);
  }, []);

  React.useEffect(() => {
    fetchRepos(orgName);
  }, [orgName, fetchRepos]);

  return (
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
              <RepositoriesTableRow repo={repo} />
            ))}
          </TableBody>
          <TablePagination
            sx={{ width: "100%" }}
            count={-1}
            page={0}
            onPageChange={() => {}}
            rowsPerPage={-1}
            labelDisplayedRows={() => ""}
            rowsPerPageOptions={[{ label: "", value: -1 }]}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RepositoriesListPage;
