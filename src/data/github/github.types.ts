import client from "./client";

export type OctoKitClient = typeof client;

export interface FetchReposParams {
  orgName: string;
}

export interface SearchOrgsParams {
  searchString: string;
}