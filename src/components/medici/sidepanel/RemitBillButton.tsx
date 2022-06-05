import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
const ExportButton: React.FunctionComponent<{ selected: any }> = ({
  selected,
}) => {
  const [anchorElTo, setAnchorElToTo] = useState<null | HTMLElement>(null);
  const openTo = Boolean(anchorElTo);
  const handleClickTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElToTo(event.currentTarget);
  };
  const handleCloseTo = () => {
    setAnchorElToTo(null);
  };

  const [anchorElAmount, setAnchorElAmount] = useState<null | HTMLElement>(
    null
  );
  const openAmount = Boolean(anchorElAmount);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAmount(event.currentTarget);
  };
  const handleCloseAmount = () => {
    setAnchorElAmount(null);
  };

  return (
    <Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Button
            id="basic-button"
            aria-controls={openTo ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openTo ? "true" : undefined}
            onClick={handleClickTo}
            sx={{ justifyContent: "flex-start" }}
          >
            To
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElTo}
            open={openTo}
            onClose={handleCloseTo}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseTo}>Salviati</MenuItem>
            <MenuItem onClick={handleCloseTo}>John Doe</MenuItem>
            <MenuItem onClick={handleCloseTo}>Jane Doe</MenuItem>
          </Menu>

          <Button
            id="basic-button"
            aria-controls={openAmount ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openAmount ? "true" : undefined}
            onClick={handleClick}
          >
            Amount
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElAmount}
            open={openAmount}
            onClose={handleCloseAmount}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <TextField
              sx={{ padding: 1 }}
              id="standard-number"
              label="...worth of goods (marcs)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <Button onClick={handleCloseAmount}>Ok</Button>
          </Menu>
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ margin: 0.75 }}>Salviati</Typography>
          <Typography sx={{ margin: 0.75 }}>1 Marc</Typography>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
        <Button variant="contained">Ok</Button>
      </div>
    </Box>
  );
};

export default ExportButton;
