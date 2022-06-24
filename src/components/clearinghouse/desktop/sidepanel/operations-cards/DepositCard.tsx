import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import {
  selectParties,
  deposit
} from "../../../../../features/clearinghouse/clearinghouseSlice";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useState } from "react";
import AmountDialog from "./dialogs/AmountDialog"
import ChoosePlayer from "./dialogs/ChoosePlayerDialog";
import { IBank } from "../../../../../program/clearinghouse/types";

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
interface Accordions {
  deposit: boolean;
  transfer: boolean;
}

const ImportCard: React.FunctionComponent<{ selected: any, accordionExpanded: Accordions, setAccordionExpanded: (v: Accordions) => void }> = ({
  selected, accordionExpanded, setAccordionExpanded
}) => {
  const dispatch = useAppDispatch();
  const { bank1, bank2 } = useAppSelector(selectParties);
  const selectedBanks = [bank1, bank2]
  // const selectedTraders = tradersArray.filter(
  //   (t) =>
  //     selected.id !== t.id && selected.city !== t.city && t.type === "exporter"
  // );

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

  const [selectedValueAmount, setSelectedValueAmount] =
    useState<number>(0);
  const [openAmount, setOpenAmount] = useState(false);

  const handleClickOpenAmount = () => {
    setOpenAmount(true);
  };
  const handleCloseAmount = () => {
    setOpenAmount(false);
  };


  const onClickTrade = () => {
    dispatch(deposit({ p1: selected, p2: selectedValueTo, amt: selectedValueAmount }));
    setSelectedValueAmount(0)
    setSelectedValuePlayer(null)
    setAccordionExpanded({...accordionExpanded, deposit: false})
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
            selectedBankers={selectedBanks}
            info={{type: selected.type, action: "trade"}}
          />

          <Button
            variant="contained"
            disabled={selectedValueTo === null}
            onClick={handleClickOpenAmount}
            sx={{ width: "130px" }}
          >
            Amount
          </Button>
          <AmountDialog
            selectedValueAmount={selectedValueAmount}
            setSelectedValueAmount={setSelectedValueAmount}
            open={openAmount}
            onClose={handleCloseAmount}
            // selectedTrader={selectedValueTo}
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

export default ImportCard;
