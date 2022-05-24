import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const columns: GridColDef[] = [
  // { field: "dueTo", headerName: "Due To", width: 100 },
  { field: "dueFrom", headerName: "Due From", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  {
    field: "amount",
    headerName: "Amount: Marcs",
    width: 130,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 100,
    renderCell: (params: GridCellParams<boolean>) =>
      params.value ? <CheckCircleIcon /> : <PendingIcon />,
  },
];

const Balances = ({selected}: {selected: any}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={{}} label="Assets" {...a11yProps(0)} />
            <Tab sx={{}} label="Liabilities" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <div style={{ height: 250, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid rows={selected.assets} columns={columns} />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ height: 250, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid rows={selected.liabilities} columns={columns} />
              </div>
            </div>
          </div>
        </TabPanel>
      

    </>
    
  )
}

export default Balances