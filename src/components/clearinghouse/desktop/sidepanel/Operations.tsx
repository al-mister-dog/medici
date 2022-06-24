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
// import DrawBillCard from "./operations-cards/DrawBillCard";
// import RemitBillCard from "./operations-cards/RemitBillCard";


interface Accordions {
  deposit: boolean;
  transfer: boolean;
  // drawBill: boolean;
  // remitBill: boolean;
}

const Operations: React.FunctionComponent<{ selected: any }> = ({
  selected,
}) => {
  const [accordionExpanded, setAccordionExpanded] = useState<Accordions>({
    deposit: false,
    transfer: false,
  });

  function toggleAccordion(key: keyof Accordions) {
    const bool = accordionExpanded[key];

    setAccordionExpanded({ ...accordionExpanded, [key]: !bool });
  }
  return (
    <>
      
        <Accordion expanded={accordionExpanded.deposit} sx={{background: "#62120E", color: "#f2eecb"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "#f2eecb"}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion("deposit")}
          >
            <Typography>Deposit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DepositCard
              selected={selected}
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={accordionExpanded.transfer} sx={{background: "#62120E", color: "#f2eecb"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "#f2eecb"}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion("transfer")}
          >
            <Typography>Transfer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TransferCard
              selected={selected}
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          </AccordionDetails>
        </Accordion>
      
      {/* {selected.type === "importer" && (
        <Accordion expanded={accordionExpanded.import} sx={{background: "#62120E", color: "#f2eecb"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "#f2eecb"}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion("import")}
          >
            <Typography>Import</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ImportCard
              selected={selected}
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion expanded={accordionExpanded.drawBill} sx={{background: "#62120E", color: "#f2eecb"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "#f2eecb"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => toggleAccordion("drawBill")}
        >
          <Typography>Draw Bill</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DrawBillCard
            selected={selected}
            accordionExpanded={accordionExpanded}
            setAccordionExpanded={setAccordionExpanded}
          />
        </AccordionDetails>
      </Accordion>
      {selected.type === "banker" && (
        <Accordion expanded={accordionExpanded.remitBill} sx={{background: "#62120E", color: "#f2eecb"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "#f2eecb"}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion("remitBill")}
          >
            <Typography>Remit Bill</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RemitBillCard
              selected={selected}
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          </AccordionDetails>
        </Accordion>
      )} */}
    </>
  );
};

export default Operations;
