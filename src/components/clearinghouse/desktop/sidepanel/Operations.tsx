import { useState } from "react";
import { Accordions, PartyOps } from "../../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import cardData from "./cardData";

const resetAccordions = {
  deposit: false,
  transfer: false,
  withdraw: false,
  openAccount: false,
  netDues: false,
  settleDues: false,
};

const Operations: React.FunctionComponent<{ selected: any }> = ({
  selected,
}) => {
  const [accordionExpanded, setAccordionExpanded] = useState<Accordions>({
    ...resetAccordions,
  });

  function toggleAccordion(key: keyof Accordions) {
    const bool = accordionExpanded[key];
    setAccordionExpanded({ ...resetAccordions, [key]: !bool });
  }

  const partyOperations: PartyOps = {
    customer: [
      {
        accordionKey: "deposit",
        accordionTitle: "Deposit",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .deposit,
      },
      {
        accordionKey: "transfer",
        accordionTitle: "Transfer",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .transfer,
      },
      {
        accordionKey: "withdraw",
        accordionTitle: "Withdraw",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .withdraw,
      },
    ],
    bank: [
      {
        accordionKey: "netDues",
        accordionTitle: "Net Dues",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .netDues,
      },
    ],
    clearinghouse: [
      {
        accordionKey: "settleDues",
        accordionTitle: "Settle Dues",
        component: cardData(selected, accordionExpanded, setAccordionExpanded)
          .settleDues,
      },
    ],
  };

  const partyAccordions = (str: keyof PartyOps) => {
    return partyOperations[str].map((party, i) => {
      return (
        <Accordion
          key={i}
          expanded={accordionExpanded[party.accordionKey as keyof Accordions]}
          sx={{ background: "#62120E", color: "#f2eecb" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#f2eecb" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion(party.accordionKey)}
          >
            <Typography>{party.accordionTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>{party.component}</AccordionDetails>
        </Accordion>
      );
    });
  };

  return <>{partyAccordions(selected.type)}</>;
};

export default Operations;
