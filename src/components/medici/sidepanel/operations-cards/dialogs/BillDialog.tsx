import { Box, Button, Dialog, Typography } from "@mui/material";
import { GridColDef, GridSelectionModel, DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const dialogInfo = {
  drawBill: {
    title: "Draw Bill",
    description: ""
  },
  remitBill: {
    title: "Remit Bill",
    description: "Pass a bill to another exchange banker so they can redeem it from the liable party"
  }
}

const columns: GridColDef[] = [
  { field: "dueFrom", headerName: "Due From", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount",
    width: 130,
  },
];

export interface DrawBillDialogProps {
  open: boolean;
  setSelectedBill: (v: any) => void;
  onClose: () => void;
  selected: any;
}

export default function DrawBillDialog(props: DrawBillDialogProps) {
  const { onClose, setSelectedBill, open, selected } = props;

  const handleClose = () => {
    onClose();
  };

  const Bills = ({ selected }: { selected: any }) => {
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>(
      []
    );

    function handleClickChooseBill() {
      const selectedBillId = selectionModel[0];
      const selectedBill = selected.assets.find(
        (bill: any) => bill.id === selectedBillId
      );
      setSelectedBill(selectedBill);
      handleClose();
    }

    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <div style={{ height: 150, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  onSelectionModelChange={(selectedRow) => {
                    setSelectionModel(selectedRow);
                  }}
                  selectionModel={selectionModel}
                  rows={selected.assets.filter(
                    (asset: { paid: boolean }) => asset.paid === false
                  )}
                  columns={columns}
                  hideFooter
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              disabled={selectionModel.length < 1}
              sx={{ alignSelf: "flex-end" }}
              onClick={handleClickChooseBill}
            >
              Ok
            </Button>
          </div>
        </Box>
      </Box>
    );
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          Find Bill
        </Typography>
        <Typography variant="subtitle1">
          Choose a bill to give to the drawee. If the drawee is owed money from
          abroad it is preferable to redeem the bill with an exchange banker
          rather than try to have their money shipped over.
        </Typography>
        <Bills selected={selected} />
      </Box>
    </Dialog>
  );
}
