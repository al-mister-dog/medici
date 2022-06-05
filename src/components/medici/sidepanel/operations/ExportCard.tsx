import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectTraders,
  selectBankers,
  trade
} from "../../../../features/actors/actorsSlice";
import * as React from "react";

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

interface Trader {
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
  const tradersArray = [me, salviati, federigo, piero];
  const selectedTraders = tradersArray.filter(
    (t) =>
      selected.id !== t.id && selected.city !== t.city && t.type === "importer"
  );

  const [selectedValueTo, setSelectedValueTo] = React.useState<Trader | null>(
    null
  );
  const [openTo, setOpenTo] = React.useState(false);
  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [selectedValueAmount, setSelectedValueAmount] =
    React.useState<number>(0);
  const [openAmount, setOpenAmount] = React.useState(false);

  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };


  const onClickTrade = () => {
    dispatch(trade({ importer: selectedValueTo, exporter: selected, amount: selectedValueAmount }));
  }

  return (
    <Box>
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
            onClick={handleClickOpenTo}
            sx={{ justifyContent: "flex-start" }}
          >
            Export To
          </Button>
          <ToDialog
            setSelectedValueTo={setSelectedValueTo}
            open={openTo}
            onClose={handleCloseTo}
            selectedTraders={selectedTraders}
          />

          <Button
            disabled={selectedValueTo === null}
            onClick={handleClickOpenAmount}
            sx={{ justifyContent: "flex-start" }}
          >
            Amount
          </Button>
          <AmountDialog
            selectedValueAmount={selectedValueAmount}
            setSelectedValueAmount={setSelectedValueAmount}
            open={openAmount}
            onClose={handleCloseAmount}
            selectedTrader={selectedValueTo}
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
            {selectedValueTo ? `${selectedValueTo.id}` : ` `}
          </Typography>
          <Typography sx={{ margin: 0.75 }}>{isNaN(selectedValueAmount) ? `_` : `${selectedValueAmount}`}</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained"
        disabled={isNaN(selectedValueAmount) || selectedValueAmount <= 0}
        onClick={onClickTrade}
        >Ok</Button>
      </div>
    </Box>
  );
};

export interface ToDialogProps {
  open: boolean;
  setSelectedValueTo: (v: Trader) => void;
  onClose: () => void;
  selectedTraders: any[];
}

function ToDialog(props: ToDialogProps) {
  const { onClose, setSelectedValueTo, open, selectedTraders } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: Trader) => {
    setSelectedValueTo(value);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          Export To
        </Typography>
        <Typography variant="subtitle1">
          Find an importer willing to buy your goods
        </Typography>
        <List sx={{ pt: 0 }}>
          {selectedTraders.map((trader, i) => (
            <ListItem
              button
              onClick={() => handleListItemClick(trader)}
              key={i}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={trader.id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}

export interface AmountDialogProps {
  open: boolean;
  selectedValueAmount: number;
  setSelectedValueAmount: (v: number) => void;
  onClose: () => void;
  selectedTrader: Trader | null;
}

function AmountDialog(props: AmountDialogProps) {
  const {
    onClose,
    setSelectedValueAmount,
    open,
    selectedTrader,
  } = props;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);
  const handleClose = () => {
    onClose();
  };
  const [provisionalAmount, setProvisionalAmount] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value);
    if (selectedTrader !== null) {
      if (amount === 0) {
        setError(true);
        setErrorMessage(`number can't be zero`);
      } else if (amount < 0 || amount > selectedTrader.goods) {
        setError(true);
        setErrorMessage(
          `${selectedTrader.id} does not have that amount of goods`
        );
      } else {
        setError(false);
        setErrorMessage(
          ``
        );
      }
    }

    setProvisionalAmount(amount);
  };

  function handleClick() {
    setSelectedValueAmount(provisionalAmount)
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: 0 }}>
          Amount of Goods
        </Typography>
        <Typography variant="subtitle1">
          Goods exported from a city quoting certain are expressed in units of
          exchange account, eg 1 = 1 gold marc worth of goods.
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            error={error ? true : false}
            helperText={errorMessage}
            sx={{ padding: 1 }}
            id="standard-number"
            label="marcs"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleChange}
          />
          <Button
            disabled={
              error || provisionalAmount <= 0 || isNaN(provisionalAmount)
            }
            onClick={handleClick}
          >
            Ok
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}
export default ExportCard;
