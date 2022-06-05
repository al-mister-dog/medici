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

  return (
    <>
      {selected.type === "exporter" && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Export</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ExportCard selected={selected} />
          </AccordionDetails>
        </Accordion>
      )}
      {selected.type === "importer" && (
        <Card>
          <CardContent>
            <Typography variant="h6" align="left">
              Import
            </Typography>
          </CardContent>
        </Card>
      )}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Draw Bill</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DrawBillCard selected={selected} />
        </AccordionDetails>
      </Accordion>
      {selected.type === "banker" && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Remit Bill</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RemitBillCard selected={selected} />
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default Operations;
