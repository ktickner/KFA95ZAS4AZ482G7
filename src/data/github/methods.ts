import type { FetchReposParams, SearchOrgsParams } from "./github.types";
import client from "./client";

export const fetchRepos = (params: FetchReposParams) => {
  return client.request("GET /orgs/{org}/repos", {
    org: params.orgName,
  });
};

export const searchOrgs = (params: SearchOrgsParams) => {
  return client.request("GET /search/users", {
    q: `type:org ${params.searchString} in:name`,
  });
};
