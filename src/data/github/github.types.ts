import client from "./client";

export type OctoKitClient = typeof client;

export interface FetchReposParams {
  org: string;
  page?: number;
  name?: string;
  min?: number;
  max?: number;
}

export interface SearchOrgsParams {
  searchString: string;
}
