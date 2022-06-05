import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectTraders,
  selectBankers,
  trade,
  remitBill,
} from "../../../../features/actors/actorsSlice";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridSelectionModel,
  GridRowId,
} from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

interface Banker {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
}

const ExportCard: React.FunctionComponent<{ selected: any }> = ({
  selected,
}) => {
  const dispatch = useAppDispatch();
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);
  const bankersArray = [you, tomasso];
  const selectedBankers = bankersArray.filter(
    (t) =>
      selected.id !== t.id && t.type === "banker"
  );

  const [selectedValueTo, setSelectedValueTo] = React.useState<Banker | null>(
    null
  );
  const [openTo, setOpenTo] = React.useState(false);
  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [selectedBill, setSelectedBill] = React.useState<any>(null);
  const [openAmount, setOpenAmount] = React.useState(false);

  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };

  const onClickremitBill = () => {
    dispatch(
      remitBill({
        presenter: selected,
        presentee: selectedValueTo,
        bill: selectedBill,
      })
    );
  };

  return (
    <Box>
      {selected.assets.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Button
                // disabled={selectedValueTo === null}
                onClick={handleClickOpenAmount}
                sx={{ justifyContent: "flex-start" }}
              >
                Bill To Remit
              </Button>
              <BillToRemitDialog
                selected={selected}
                setSelectedBill={setSelectedBill}
                open={openAmount}
                onClose={handleCloseAmount}
              />
              <Button
                onClick={handleClickOpenTo}
                sx={{ justifyContent: "flex-start" }}
              >
                Remit Bill To
              </Button>
              <ToDialog
                onClose={handleCloseTo}
                setSelectedValueTo={setSelectedValueTo}
                open={openTo}
                selectedBankers={selectedBankers}
              />
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ margin: 0.75 }}>
                {selectedBill
                  ? `${selectedBill.dueFrom}: ${selectedBill.amount}`
                  : ` `}
              </Typography>
              <Typography sx={{ margin: 0.75 }}>
                {selectedValueTo ?
                `${selectedValueTo.id}`: `_`}
              </Typography>
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
              variant="contained"
              disabled={!selectedValueTo || !selectedBill}
              onClick={onClickremitBill}
            >
              Ok
            </Button>
          </div>
        </>
      ) : (
        <Typography>There are no bills to remit</Typography>
      )}
    </Box>
  );
};

const columnsAssets: GridColDef[] = [
  { field: "dueFrom", headerName: "Due From", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount",
    width: 130,
  },
];

export interface BillToRemitDialogProps {
  open: boolean;
  setSelectedBill: (v: any) => void;
  onClose: () => void;
  selected: any;
}

function BillToRemitDialog(props: BillToRemitDialogProps) {
  const { onClose, setSelectedBill, open, selected } = props;

  const handleClose = () => {
    onClose();
  };

  const Bills = ({ selected }: { selected: any }) => {
    const [selectionModel, setSelectionModel] =
      React.useState<GridSelectionModel>([]);

    function handleClickChooseBill() {
      const selectedBillId = selectionModel[0];
      const selectedBill = selected.assets.find(
        (bill: any) => bill.id === selectedBillId
      );
      setSelectedBill(selectedBill);
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
                  // checkboxSelection
                  onSelectionModelChange={(selectedRow) => {
                    setSelectionModel(selectedRow);
                  }}
                  selectionModel={selectionModel}
                  rows={selected.assets}
                  columns={columnsAssets}
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

export interface ToDialogProps {
  open: boolean;
  setSelectedValueTo: (v: Banker) => void;
  onClose: () => void;
  selectedBankers: any[];
}

function ToDialog(props: ToDialogProps) {
  const { onClose, setSelectedValueTo, open, selectedBankers } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: Banker) => {
    setSelectedValueTo(value);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          Remit Bill
        </Typography>
        <Typography variant="subtitle1">
          Pass a bill to another exchange banker so they can redeem it from the liable party
        </Typography>
        <List sx={{ pt: 0 }}>
          {selectedBankers.map((banker, i) => (
            <ListItem
              button
              onClick={() => handleListItemClick(banker)}
              key={i}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={banker.id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}
export default ExportCard;
