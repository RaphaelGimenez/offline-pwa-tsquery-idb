import React, { useEffect } from "react";
import { Button, TextInput, Textarea, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

interface PostFormProps {
  type: "create" | "update";
  initialValues?: {
    title: string;
    content: string;
  };
  onCancel?: () => void;
  onSubmit: (values: { title: string; content: string }) => void;
  loading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  onSubmit,
  type,
  initialValues,
  loading,
  onCancel,
}) => {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },

    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
      content: (value) =>
        value.trim().length === 0 ? "Content is required" : null,
    },
  });

  useEffect(() => {
    if (type === "update" && initialValues) {
      form.setValues(initialValues);
    }
  }, [type, initialValues]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Title"
        placeholder="Enter post title"
        {...form.getInputProps("title")}
        required
      />
      <Textarea
        label="Content"
        placeholder="Enter post content"
        {...form.getInputProps("content")}
        required
        mt="md"
        resize="vertical"
      />
      <Group mt="md">
        <Button type="submit" loading={loading}>
          Submit
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => {
            if (onCancel) {
              onCancel();
            }
          }}
        >
          Cancel
        </Button>
      </Group>
    </form>
  );
};

export default PostForm;
