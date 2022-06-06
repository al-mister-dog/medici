import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectBankers,
  remitBill,
} from "../../../../features/actors/actorsSlice";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import DrawBillDialog from "./dialogs/BillDialog";
import ChooseActor from "./dialogs/ChooseActorDialog";
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

interface Accordions {
  export: boolean;
  import: boolean;
  drawBill: boolean;
  remitBill: boolean;
}

const ExportCard: React.FunctionComponent<{
  selected: any;
  accordionExpanded: Accordions;
  setAccordionExpanded: (v: Accordions) => void;
}> = ({ selected, accordionExpanded, setAccordionExpanded }) => {
  const dispatch = useAppDispatch();
  const { you, tomasso } = useAppSelector(selectBankers);
  const bankersArray = [you, tomasso];
  const selectedBankers = bankersArray.filter(
    (t) => selected.id !== t.id && t.type === "banker"
  );

  const [selectedValueTo, setSelectedValueActor] = useState<Banker | null>(
    null
  );
  const [openTo, setOpenTo] = useState(false);
  const handleClickOpenTo = () => {
    setOpenTo(true);
  };
  const handleCloseTo = () => {
    setOpenTo(false);
  };

  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [openAmount, setOpenAmount] = useState(false);

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
    setSelectedValueActor(null);
    setSelectedBill(null);
    setAccordionExpanded({ ...accordionExpanded, remitBill: false });
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
              <DrawBillDialog
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
              <ChooseActor
                onClose={handleCloseTo}
                setSelectedValueActor={setSelectedValueActor}
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
                {selectedValueTo ? `${selectedValueTo.id}` : `_`}
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

export default ExportCard;
