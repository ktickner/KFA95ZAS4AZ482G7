import type { FetchReposParams, SearchOrgsParams } from "./github.types";
import client from "./client";

function buildStarsQueryString(min?: number, max?: number) {
  if (min && max) {
    return ` stars:${min}..${max}`;
  }

  if (max && !min) {
    return ` stars:<${max}`;
  }

  if (min && !max) {
    return ` stars:>${min}`;
  }

  return "";
}

export const searchRepos = (params: FetchReposParams) => {
  const { org, page, name, min, max } = params;

  // Leading space in query string parts to help build the query string correctly
  const nameQueryString = name ? ` ${name} in:name` : "";
  const starsQueryString = buildStarsQueryString(min, max);

  return client.request("GET /search/repositories", {
    q: `org:${org}${nameQueryString}${starsQueryString}`,
    page,
  });
};

export const searchOrgs = (params: SearchOrgsParams) => {
  return client.request("GET /search/users", {
    q: `type:org ${params.searchString} in:name`,
  });
};
