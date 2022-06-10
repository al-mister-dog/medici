import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectRecords,
  selectConditions,
  reset,
} from "../../../../features/players/playersSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  IconButton,
  Box,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import { capitalize } from "../../helpers";

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const records = useAppSelector(selectRecords);
  const { certaintyQuotes, exchangeRates } =
    useAppSelector(selectConditions);

  const cities = Object.keys(certaintyQuotes).map((c) => ({
    city: c,
    certain: certaintyQuotes[c],
  }));
  const rates = Object.keys(exchangeRates).map((c) => ({
    city: c,
    price: exchangeRates[c],
  }));

  return (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: "#735c51",
          boxShadow: "0px 10px 13px -7px #F3F6F9",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column"}}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                Quotes
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {cities.map((city, i) => (
                  <Typography key={i} sx={{ color: "white", fontSize: 12 }}>
                    {capitalize(city.city)}: {city.certain ? "Certain" : "Moveable"}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", marginLeft: "50px" }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                Rates (Ecus to Marc)
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {rates.map((city, i) => (
                  <Typography key={i} sx={{ color: "white", fontSize: 12 }}>
                    {capitalize(city.city)}: {city.price}
                  </Typography>
                ))}
              </Box>
            </Box>

          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{ alignSelf: "flex-end", color: "white", fontSize: 10 }}
            >
              {records.length > 0
                ? `${records[records.length - 1]}`
                : `Trade to start`}
            </Typography>
            <Tooltip title="refresh">
              <IconButton onClick={() => dispatch(reset())}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
}
