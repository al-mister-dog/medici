import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  deposit,
} from "../../../../../features/fundamentals/correspondentSlice";

import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";
import { IBank } from "../../../../../program/clearinghouse/types";
import { Accordions } from "../../../../types";

const ImportCard: React.FunctionComponent<{
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
  const bankParties = partiesArray.filter((party) =>
    selected.assets.customerDeposits.find((acc: any) => acc.id === party.id)
  );
  // const selectedTraders = tradersArray.filter(
  //   (t) =>
  //     selected.id !== t.id && selected.city !== t.city && t.type === "exporter"
  // );

  const [selectAmount, setSelectAmount] = useState(false);
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);

  const onClickTrade = () => {
    dispatch(
      deposit({ p1: selected, p2: selectedValueTo, amt: selectedValueAmount })
    );
    setSelectedValueAmount(0);
    setSelectedValuePlayer(null);
    setAccordionExpanded({ ...accordionExpanded, deposit: false });
    setSelectAmount(!selectAmount);
  };

  const [errorMessage, setErrorMessage] = useState(``);
  const [provisionalAmount, setProvisionalAmount] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  function handleClick() {
    setSelectedValueAmount(provisionalAmount);
    setSelectAmount(!selectAmount);
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
            variant="contained"
            onClick={handleClickOpenTo}
            sx={{ width: "130px", marginBottom: "5px" }}
          >
            Deposit To
          </Button>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={bankParties}
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

          <Box sx={{ display: "flex" }}>
            <TextField
              sx={{
                color: "#f2eecb",
                input: { color: "#f2eecb" },
                label: { color: "#f2eecb" },
                "& label.Mui-focused": {
                  color: "#f2eecb",
                },
              }}
              id="standard-number"
              label="dollars"
              type="number"
              value={selectedValueAmount}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
          </Box>
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
          disabled={selectedValueAmount < 1 || selectedValueTo === null}
          onClick={onClickTrade}
        >
          Ok
        </Button>
      </div>
    </Box>
  );
};

export default ImportCard;
