import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { paginationModel } from "@shared/constants";

function CustomDataGrid<T>({
  CustomToolbar,
  columns,
  rows,
  disableToolbar,
}: {
  rows: T[];
  columns: GridColDef[];
  CustomToolbar: () => JSX.Element;
  disableToolbar: boolean;
}) {
  return (
    <DataGrid
      slots={
        disableToolbar
          ? {}
          : {
              toolbar: CustomToolbar,
            }
      }
      rows={rows}
      columns={columns}
      disableColumnMenu
      disableColumnSorting
      disableAutosize
      disableColumnResize
      disableColumnSelector
      disableMultipleRowSelection
      disableColumnFilter
      disableRowSelectionOnClick
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[10, 15, 20, 30, 40]}
      sx={{ border: 0 }}
    />
  );
}

export default CustomDataGrid;
