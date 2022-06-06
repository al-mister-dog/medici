import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import Operations from "./Operations"
import Balances from "./Balances";
import BasicInfo from "./BasicInfo"

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

const ActorTabs = ({selected}: {selected: any}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            // centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={{}} label="Operations" {...a11yProps(0)} />
            <Tab sx={{}} label="Bills" {...a11yProps(1)} />
            <Tab sx={{}} label="Records" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
        <Box sx={{paddingLeft: "50px", paddingRight: "50px"}}>
        <Operations selected={selected} />
        </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Balances selected={selected} />
          
        
        </TabPanel>
        <TabPanel value={value} index={2}>
        <p>Operations</p>
        </TabPanel>
        
        

    </>
    
  )
}

export default ActorTabs