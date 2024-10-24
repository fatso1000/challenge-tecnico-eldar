import { Box, TextField } from "@mui/material";
import React from "react";
import { IPost } from "../../../../types";

function PostForm({
  formData,
  handleInputChange,
}: {
  formData: IPost;
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}) {
  return (
    <Box>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        type="text"
        name="title"
        margin="normal"
        fullWidth
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="body"
        label="Body"
        variant="outlined"
        type="text"
        name="body"
        value={formData.body}
        margin="normal"
        fullWidth
        onChange={handleInputChange}
        required
      />
    </Box>
  );
}

export default PostForm;
