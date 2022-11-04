import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import type { RepositoriesTableRowProps } from "../../RepositoriesList.types";

const RepositoriesTableRow: React.FC<RepositoriesTableRowProps> = ({
  repo,
}) => {
  return (
    <TableRow key={repo.id}>
      <TableCell>{repo.name}</TableCell>
      <TableCell>{repo.open_issues_count}</TableCell>
      <TableCell>{repo.stargazers_count}</TableCell>
    </TableRow>
  );
};

export default RepositoriesTableRow;
