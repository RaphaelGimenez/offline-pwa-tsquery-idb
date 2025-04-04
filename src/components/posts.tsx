import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { postQueries } from "../queries/post-queries";
import { Button, Stack } from "@mantine/core";
import PostForm from "./post-form";
import { postApi } from "../apis/post-api";
import PostCard from "./post-card";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const posts = useQuery(postQueries.list(""));
  const updatePost = useMutation({
    mutationFn: postApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      });
    },
  });
  const createPost = useMutation({
    mutationFn: postApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      });
    },
  });

  const postToEdit = posts.data?.find((p) => p.id === editId);

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowForm(true);
  };
  const handleCancel = () => {
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (values: { title: string; content: string }) => {
    if (postToEdit) {
      updatePost.mutate({
        id: postToEdit.id,
        title: values.title,
        body: values.content,
        createdAt: postToEdit.createdAt,
        userId: 1,
      });
    } else {
      createPost.mutate({
        title: values.title,
        body: values.content,
        userId: 1,
      });
    }
  };

  const initialValues = {
    title: postToEdit?.title || "",
    content: postToEdit?.body || "",
  };

  useEffect(() => {
    if (updatePost.isSuccess || createPost.isSuccess) {
      setShowForm(false);
      setEditId(null);
    }
  }, [updatePost.isSuccess, createPost.isSuccess]);

  return (
    <Stack p="md">
      {showForm ? (
        <PostForm
          type={editId ? "update" : "create"}
          initialValues={initialValues}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          loading={updatePost.isPending}
        />
      ) : (
        <Button
          onClick={() => {
            setShowForm(true);
          }}
        >
          Create Post
        </Button>
      )}

      {posts.data?.map((post) => (
        <PostCard key={post.id} onEdit={handleEdit} {...post} />
      ))}
    </Stack>
  );
};

export default Posts;
