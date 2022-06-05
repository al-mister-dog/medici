import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { Box, Typography } from "@mui/material";
const columnsAssets: GridColDef[] = [
  // { field: "dueTo", headerName: "Due To", width: 100 },
  { field: "dueFrom", headerName: "Due From", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount: Marcs",
    width: 130,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 100,
    renderCell: (params: GridCellParams<boolean>) =>
      params.value ? <CheckCircleIcon /> : <PendingIcon />,
  },
];

const columnsLiabilities: GridColDef[] = [
  { field: "dueTo", headerName: "Due To", width: 100 },
  // { field: "dueFrom", headerName: "Due From", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount: Marcs",
    width: 130,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 100,
    renderCell: (params: GridCellParams<boolean>) =>
      params.value ? <CheckCircleIcon /> : <PendingIcon />,
  },
];

const Balances = ({ selected }: { selected: any }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 5 }}>
        <Typography
          align="left"
          sx={{ letterSpacing: "0.5px" }}
        >
          Assets
        </Typography>
        <div style={{ height: 200, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={selected.assets}
                columns={columnsAssets}
                hideFooter
              />
            </div>
          </div>
        </div>
      </Box>
      <Box>
        <Typography align="left" sx={{ letterSpacing: "0.5px" }}>Liabilities</Typography>
        <div style={{ height: 200, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={selected.liabilities}
                columns={columnsLiabilities}
                hideFooter
              />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Balances;
