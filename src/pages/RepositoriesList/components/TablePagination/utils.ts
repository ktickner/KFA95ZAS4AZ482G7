export const extractLinkPageNumber = (
  linkType: "previous" | "next" | "first" | "last",
  links?: string[]
): string | undefined => {
  return links
    ?.find((link) => link.includes(`rel="${linkType}"`))
    ?.split("page=")?.[1]
    ?.split(">")?.[0];
};
