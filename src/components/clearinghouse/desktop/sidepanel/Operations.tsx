import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import DepositCard from "./operations-cards/DepositCard";
import TransferCard from "./operations-cards/TransferCard";
import WithdrawCard from "./operations-cards/WithdrawCard";
import OpenAccountCard from "./operations-cards/OpenAccountCard";
import NetDuesCard from "./operations-cards/NetDuesCard";
import SettleDuesCard from "./operations-cards/SettleDuesCard";
import { Accordions } from "../../../types";
// import RemitBillCard from "./operations-cards/RemitBillCard";

const Operations: React.FunctionComponent<{ selected: any }> = ({
  selected,
}) => {
  const [accordionExpanded, setAccordionExpanded] = useState<Accordions>({
    deposit: false,
    transfer: false,
    withdraw: false,
    openAccount: false,
    netDues: false,
    settleDues: false,
  });

  function toggleAccordion(key: keyof Accordions) {
    const bool = accordionExpanded[key];

    setAccordionExpanded({ ...accordionExpanded, [key]: !bool });
  }
  const cardz = {
    customer: [
      {
        accordionKey: "deposit",
        accordionTitle: "Deposit",
        component: (
          <DepositCard
            selected={selected}
            accordionExpanded={accordionExpanded}
            setAccordionExpanded={setAccordionExpanded}
          />
        ),
      },
      {
        accordionKey: "transfer",
        accordionTitle: "Transfer",
        component: (
          <TransferCard
            selected={selected}
            accordionExpanded={accordionExpanded}
            setAccordionExpanded={setAccordionExpanded}
          />
        ),
      },
      {
        accordionKey: "withdraw",
        accordionTitle: "Withdraw",
        component: (
          <TransferCard
            selected={selected}
            accordionExpanded={accordionExpanded}
            setAccordionExpanded={setAccordionExpanded}
          />
        ),
      },
    ],
    bank: {},
    clearinghouse: {},
  };

  return (
    <>
      {selected.id.includes("customer") &&
        cardz.customer.map((party, i) => (
          <Accordion
            key={i}
            expanded={accordionExpanded[party.accordionKey as keyof Accordions]}
            sx={{ background: "#62120E", color: "#f2eecb" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#f2eecb" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => toggleAccordion("deposit")}
            >
              <Typography>{party.accordionTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {party.component}
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default Operations;
