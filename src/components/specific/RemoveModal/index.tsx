import { Box, Button, Modal, Typography } from "@mui/material";
import { modalStyles } from "@shared/constants";

function RemoveModal({
  isModalOpen,
  onCloseModal,
  removeSelectedPost,
}: {
  isModalOpen: boolean;
  onCloseModal: () => void;
  removeSelectedPost: () => Promise<void>;
}) {
  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this post?
        </Typography>
        <Box sx={{ gap: 2, display: "inline-flex" }}>
          <Button
            type="button"
            onClick={removeSelectedPost}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button type="button" onClick={onCloseModal} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RemoveModal;
