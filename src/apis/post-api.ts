import { apiClient } from "./client";

export const postApi = {
  getAll: (filters: string) => {
    return apiClient
      .get("posts", {
        searchParams: {
          _sort: "-createdAt",
          filters,
        },
      })
      .json<
        {
          id: number;
          title: string;
          body: string;
          userId: number;
          createdAt: string;
        }[]
      >();
  },
  getById: (id: number) => {
    return apiClient.get(`posts/${id}`).json<{
      id: number;
      title: string;
      body: string;
      userId: number;
      createdAt: string;
    }>();
  },
  create: (data: {
    id?: number;
    title: string;
    body: string;
    userId: number;
  }) => {
    return apiClient
      .post("posts", {
        json: {
          ...data,
          createdAt: new Date().toISOString(),
        },
      })
      .json();
  },
  update: (data: {
    id: number;
    title: string;
    body: string;
    userId: number;
    createdAt: string;
  }) => {
    return apiClient.put(`posts/${data.id}`, { json: data }).json();
  },
};
