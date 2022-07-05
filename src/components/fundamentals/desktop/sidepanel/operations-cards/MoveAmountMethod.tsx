import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  withdraw,
} from "../../../../../features/fundamentals/correspondentSlice";
import { findByCustomersAccounts } from "./__filters";
import { Box, Button, Typography } from "@mui/material";

import { useState } from "react";
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";
import { IBank } from "../../../../../program/clearinghouse/types";
import { Accordions } from "../../../../types";
import Amount from "./buttons/Amount";

const ImportCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
  filterMethod: (selected: IBank, partiesArray: IBank[]) => IBank[];
}> = ({ selected, accordionExpanded, setAccordionExpanded, filterMethod }) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);

  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }
  // const bankParties = findByCustomersAccounts(selected, partiesArray);
  const selectedParties = filterMethod(selected, partiesArray);
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const onClickOk = () => {
    dispatch(
      withdraw({ p1: selected, p2: selectedValueTo, amt: selectedValueAmount })
    );
    setSelectedValueAmount(0);
    setSelectedValuePlayer(null);
    setAccordionExpanded({ ...accordionExpanded, deposit: false });
  };

  const [errorMessage, setErrorMessage] = useState(``);

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
            Withdraw From
          </Button>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedParties}
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
          disabled={selectedValueAmount < 1 || selectedValueTo === null}
          onClick={onClickOk}
        >
          Ok
        </Button>
      </div>
    </Box>
  );
};

export default ImportCard;
