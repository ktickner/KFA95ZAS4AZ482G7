export interface RepositoriesListTablePaginationProps {
  linkHeader: string | null;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export interface PageLinkNumbers {
  next?: string;
  previous?: string;
  first?: string;
  last?: string;
}

export type LinkType = "previous" | "next" | "first" | "last";
