import client from "./client";

export type OctoKitClient = typeof client;

export interface FetchReposParams {
  orgName: string;
  page: number;
}

export interface SearchOrgsParams {
  searchString: string;
}
