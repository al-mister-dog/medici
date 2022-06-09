import { useAppDispatch } from "../../../../app/hooks";
import {
  reset,
} from "../../../../features/players/playersSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  IconButton,
  Box,
  Toolbar,
  Tooltip,
} from "@mui/material";

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          backgroundColor: "white",
          // boxShadow: "0px 10px 13px -7px #F3F6F9",
        }}
      >
        <Tooltip title="refresh">
          <IconButton onClick={() => dispatch(reset())}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Box>
  );
}
