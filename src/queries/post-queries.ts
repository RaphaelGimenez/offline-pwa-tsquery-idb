import { queryOptions } from "@tanstack/react-query";
import { postApi } from "../apis/post-api";

export const postQueries = {
  all: () => ["posts"],

  lists: () => [...postQueries.all(), "list"],

  list: (filters: string) =>
    queryOptions({
      queryKey: [...postQueries.lists(), filters],

      queryFn: () => postApi.getAll(filters),
    }),

  details: () => [...postQueries.all(), "detail"],

  detail: (id: number) =>
    queryOptions({
      queryKey: [...postQueries.details(), id],

      queryFn: () => postApi.getById(id),
    }),
};
