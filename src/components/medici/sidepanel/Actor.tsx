import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import { useState } from "react";
import Balances from "./Balances";

const Actor: React.FunctionComponent<{ selected: any }> = ({ selected }) => {
  
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <h4>{selected.id}: {selected.type}, {selected.city}</h4>
        {selected.type === "exporter" && <Button variant="contained">Export</Button>}
        {selected.type === "importer" && <Button variant="contained">Import</Button>}
        <Button variant="contained">Draw Bill</Button>
        {selected.type === "banker" && <Button variant="contained">Remit Bill</Button>}
        <Balances selected={selected} />
      </Box>
    </>
  );
};
export default Actor;
