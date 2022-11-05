import * as React from "react";
import Pagination from "@mui/material/Pagination";

import * as utils from "./utils";

interface RepositoriesListTablePaginationProps {
  linkHeader: string | null;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

interface PageLinkNumbers {
  next?: string;
  previous?: string;
  first?: string;
  last?: string;
}

const RepositoriesListTablePagination: React.FC<
  RepositoriesListTablePaginationProps
> = ({ linkHeader, onPageChange }) => {
  const [pageLinkNumbers, setPageLinkNumbers] = React.useState<PageLinkNumbers>(
    {}
  );

  React.useEffect(() => {
    const links = linkHeader?.split(", ");
    const last = utils.extractLinkPageNumber("last", links);
    const first = utils.extractLinkPageNumber("first", links);
    const previous = utils.extractLinkPageNumber("previous", links);
    const next = utils.extractLinkPageNumber("next", links);

    setPageLinkNumbers({ first, last, previous, next });
  }, [linkHeader]);

  // Avoiding NaN from appearing
  const pageCount = pageLinkNumbers?.last ? +pageLinkNumbers.last : 1;

  return (
    <Pagination
      count={pageCount}
      onChange={onPageChange}
      showFirstButton
      showLastButton
    />
  );
};

export default RepositoriesListTablePagination;
