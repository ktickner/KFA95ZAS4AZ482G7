import type { LinkType } from "./TablePagination.types";

export const extractLinkPageNumber = (
  linkType: LinkType,
  links?: string[]
): string | undefined => {
  return links
    ?.find((link) => link.includes(`rel="${linkType}"`))
    ?.split("page=")?.[1]
    ?.split(">")?.[0];
};
