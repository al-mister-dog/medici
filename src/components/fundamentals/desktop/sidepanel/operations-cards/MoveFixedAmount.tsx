import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  withdraw,
  deposit,
  transfer,
  payBank,
} from "../../../../../features/fundamentals/fundamentalsSlice";

import { useEffect, useState } from "react";
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";
import { IBank } from "../../../../../program/clearinghouse/types";
import { Accordions } from "../../../../types";
import { Box, Button, Typography } from "@mui/material";

type DispatchFunctionSig = (
  selected: IBank,
  selectedValueTo: IBank,
  selectedValueAmount: number
) => void;

interface Dispatches {
  withdraw: DispatchFunctionSig;
  deposit: DispatchFunctionSig;
  transfer: DispatchFunctionSig;
  payBank: DispatchFunctionSig;
}

const MoveFixedAmount: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
  filterMethod: (selected: IBank, partiesArray: IBank[]) => IBank[];
  operationText: string;
  methodText: string;
  dispatchMethod: keyof Dispatches;
  config?: any;
}> = ({
  config,
  selected,
  accordionExpanded,
  setAccordionExpanded,
  filterMethod,
  operationText,
  methodText,
  dispatchMethod,
}) => {
  const [selectedValueTo, setSelectedValuePlayer] = useState<IBank | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const [selectedValueAmount, setSelectedValueAmount] = useState<number>(0);

  const dispatch = useAppDispatch();

  const dispatchMethods = {
    deposit(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        deposit({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    withdraw(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        withdraw({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    transfer(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        transfer({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
    payBank(
      selected: IBank,
      selectedValueTo: IBank,
      selectedValueAmount: number
    ) {
      dispatch(
        payBank({
          p1: selected,
          p2: selectedValueTo,
          amt: selectedValueAmount,
        })
      );
    },
  };
  const parties = useAppSelector(selectParties);
  let partiesArray: IBank[] = [];
  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }
  const selectedParties = filterMethod(selected, partiesArray);

  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const onClickOk = () => {
    if (selectedValueTo !== null) {
      dispatchMethods[dispatchMethod](
        selected,
        selectedValueTo,
        selectedValueAmount
      );
      setSelectedValueAmount(0);
      setSelectedValuePlayer(null);
      setAccordionExpanded({ ...accordionExpanded, deposit: false });
    }
  };

  useEffect(() => {
    if (selectedValueTo) {
      const selectedAmount = selectedValueTo.liabilities.dues.find(
        (account) => account.id === selected.id
      );
      if (selectedAmount) {
        setSelectedValueAmount(selectedAmount.amount);
      }
    }
  }, [selectedValueTo]);

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
            {methodText}
          </Button>
          <ChoosePlayer
            setSelectedValuePlayer={setSelectedValuePlayer}
            open={openTo}
            onClose={handleCloseTo}
            selectedBankers={selectedParties}
            methodText={operationText}
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
          <Typography sx={{ margin: 0.75 }}>
            ${selectedValueAmount ? `${selectedValueAmount}` : `0`}
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
          disabled={
            selectedValueAmount < 1 ||
            selectedValueTo === null ||
            !selectedValueAmount
          }
          onClick={onClickOk}
        >
          Ok
        </Button>
      </div>
    </Box>
  );
};

export default MoveFixedAmount;
