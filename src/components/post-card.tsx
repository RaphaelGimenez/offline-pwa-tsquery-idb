import { Button, Card, Text } from "@mantine/core";
import React from "react";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  onEdit: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ title, body, id, onEdit }) => {
  return (
    <Card withBorder>
      <Text fw={500}>{title}</Text>

      <Text size="sm" c="dimmed">
        {body}
      </Text>
      <Button
        mt="md"
        variant="outline"
        onClick={() => {
          onEdit(id);
        }}
      >
        Edit
      </Button>
    </Card>
  );
};

export default PostCard;
