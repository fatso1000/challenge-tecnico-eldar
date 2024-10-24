import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import dialogStore from "@store/dialogStore";

export default function FormDialog({
  title,
  children,
  onSubmit,
  onClose,
}: {
  title: string;
  children: JSX.Element;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  const dialog = dialogStore();

  const handleClose = () => {
    onClose();
    dialog.handleClose();
  };

  return (
    <Dialog
      open={dialog.isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit,
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
