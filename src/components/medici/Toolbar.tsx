import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectRecords,
  selectConditions,
} from "../../features/actors/actorsSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function ButtonAppBar() {
  const records = useAppSelector(selectRecords);
  const { certaintyQuotes, exchangeRates, currencies } =
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "black" }}>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Quotes:
            </Typography>
            {cities.map((city, i) => (
              <Typography key={i} sx={{margin: "5px"}}>
                {city.city}: {city.certain ? "Certain" : "Moveable"}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Rates (Ecus to Marc): 
            </Typography>
            {rates.map((city, i) => (
              <Typography key={i} sx={{margin: "5px"}}>
                {city.city}: {city.price}
              </Typography>
            ))}
          </Box>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            {records.length > 0
              ? `${records[records.length - 1]}`
              : `Trade to start`}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
