import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ExportCard from "./operations/ExportCard";
import ImportCard from "./operations/ImportCard";
import DrawBillCard from "./operations/DrawBillCard";
import RemitBillCard from "./operations/RemitBillCard";

const Operations: React.FunctionComponent<{ selected: any }> = ({
  selected,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [exportCardExpanded, setExportCardExpanded] = useState<boolean>(false);
  // function toggleAccordionExport() {
  //   setExportCardExpanded((prev) => !prev)
  // }
  interface Accordions {
    export: boolean;
    import: boolean;
    drawBill: boolean;
    remitBill: boolean;
  }
  const [accordionExpanded, setAccordionExpanded] = useState<Accordions>({
    export: false,
    import: false,
    drawBill: false,
    remitBill: false,
  });

  function toggleAccordion(key: keyof Accordions) {
    const bool = accordionExpanded[key]
    
    setAccordionExpanded({...accordionExpanded, [key]: !bool});
    
  }
  return (
    <>
      {selected.type === "exporter" && (
        <Accordion expanded={accordionExpanded.export}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion("export")}
          >
            <Typography>Export</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ExportCard
              selected={selected}
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {selected.type === "importer" && (
        <Accordion expanded={accordionExpanded.import}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion("import")}
          >
            <Typography>Import</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ImportCard selected={selected} accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}/>
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion expanded={accordionExpanded.drawBill}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => toggleAccordion("drawBill")}
        >
          <Typography>Draw Bill</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DrawBillCard selected={selected} accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}/>
        </AccordionDetails>
      </Accordion>
      {selected.type === "banker" && (
        <Accordion expanded={accordionExpanded.remitBill}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => toggleAccordion("remitBill")}
          >
            <Typography>Remit Bill</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RemitBillCard selected={selected} accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}/>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default Operations;