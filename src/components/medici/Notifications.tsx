import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectRecords } from "../../features/actors/actorsSlice";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function ButtonAppBar() {
  const records = useAppSelector(selectRecords)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "black"}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Florence: Quoting Certain, Lyons: Quoting Moveable
          </Typography>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            News: {records.length > 0 ? `${records[records.length -1]}`: `Trade to start`}
          </Typography>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}
