import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

interface RepositoriesListTablePaginationProps {
  linkHeader: string | null;
  onPageChange: () => void;
}

const RepositoriesListTablePagination: React.FC<
  RepositoriesListTablePaginationProps
> = ({ linkHeader, onPageChange }) => {
  console.log(linkHeader);
  const [pageNumber, setPageNumber] = React.useState<number>(0);

  React.useEffect(() => {
    const links = linkHeader?.split(", ");
    console.log(links);
    const nextLink = links
      ?.find((link) => link.includes('rel="next"'))
      ?.split("<")?.[1]
      ?.split(">")?.[0]
      .replace("https://api.github.com", "");
    const lastLink = links
      ?.find((link) => link.includes('rel="last"'))
      ?.split("<")?.[1]
      ?.split(">")?.[0]
      .replace("https://api.github.com", "");

    console.log(nextLink, lastLink);
  }, [linkHeader]);

  function handlePageChange() {
    setPageNumber(1);

    onPageChange();
  }

  return (
    <TablePagination
      sx={{ width: "100%" }}
      count={-1}
      page={pageNumber}
      onPageChange={handlePageChange}
      rowsPerPage={-1}
      labelDisplayedRows={() => ""}
      rowsPerPageOptions={[{ label: "", value: -1 }]}
    />
  );
};

export default RepositoriesListTablePagination;
