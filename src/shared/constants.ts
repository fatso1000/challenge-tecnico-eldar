import { GridColDef } from "@mui/x-data-grid";

export const modalStyles = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const initialFormDataPost = {
  body: "",
  id: 0,
  title: "",
};

export const paginationModel = { page: 0, pageSize: 10 };

export const columnsInitial: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 170 },
  { field: "body", headerName: "Body", width: 170 },
];
