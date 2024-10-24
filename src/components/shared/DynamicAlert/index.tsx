import { Snackbar, Alert } from "@mui/material";
import alertStore from "@store/alertStore";

function DynamicAlert() {
  const { isOpen, message, severity, closeAlert } = alertStore();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={closeAlert} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default DynamicAlert;
