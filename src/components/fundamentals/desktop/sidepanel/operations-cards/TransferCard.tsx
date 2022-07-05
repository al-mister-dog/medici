import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  transfer,
} from "../../../../../features/fundamentals/correspondentSlice";

import { Box, Button, Typography } from "@mui/material";

import { useState } from "react";
import AmountDialog from "./dialogs/AmountDialog";
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";

import { findAllCustomers } from "./__filters";
import { Accordions } from "../../../../types";
import { IBank } from "../../../../../features/clearinghouse/program/types";
import Amount from "./buttons/Amount";

const TransferCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);

  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }
  const selectedBanks = findAllCustomers(selected, partiesArray);

  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);
  const [openAmount, setOpenAmount] = useState(false);

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };
  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };

  const onClickOk = () => {
    dispatch(
      transfer({ p1: selected, p2: selectedValueTo, amt: selectedValueAmount })
    );
    setSelectedValueAmount(0);
    setSelectedValuePlayer(null);
    setAccordionExpanded({ ...accordionExpanded, transfer: false });
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value);
    // if (selectedTrader !== null) {
    //   if (amount === 0) {
    //     setError(true);
    //     setErrorMessage(`number can't be zero`);
    //   } else if (amount < 0 || amount > selectedTrader.goods) {
    //     setError(true);
    //     setErrorMessage(
    //       `${selectedTrader.id} does not have that amount of goods`
    //     );
    //   } else {
    //     setError(false);
    //     setErrorMessage(
    //       ``
    //     );
    //   }
    // }

    setSelectedValueAmount(amount);
  };

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
            variant="contained"
            onClick={handleClickOpenTo}
            sx={{ width: "130px", marginBottom: "5px" }}
          >
            Transfer To
          </Button>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedBanks}
          />

          <Typography
            variant="h6"
            sx={{ color: "#f2eecb", paddingLeft: "7px" }}
          >
            Amount
          </Typography>
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
          <Amount
            selectedValueAmount={selectedValueAmount}
            handleChangeAmount={handleChangeAmount}
          />
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
          disabled={isNaN(selectedValueAmount) || selectedValueAmount <= 0}
          onClick={onClickOk}
        >
          Ok
        </Button>
      </div>
    </Box>
  );
};

export default TransferCard;
