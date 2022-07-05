//TODO
//credit expansion graph
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectParties
} from "../../../../features/fundamentals/correspondentSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  IconButton,
  Box,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import { capitalize } from "../../helpers";
import { useEffect, useState } from "react";

// const toolbarTextColor = '#f2eecb'
const toolbarTextColor = "black"
export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  // const { certaintyQuotes, exchangeRates } =
  //   useAppSelector(selectConditions);

  // const cities = Object.keys(certaintyQuotes).map((c) => ({
  //   city: c,
  //   certain: certaintyQuotes[c],
  // }));
  // const rates = Object.keys(exchangeRates).map((c) => ({
  //   city: c,
  //   price: exchangeRates[c],
  // }));
  const [total, setTotal] = useState<number>(0)

useEffect(() => {
  let amount1 = parties.bank1.assets.customerOverdrafts[0].amount
  let amount2 = parties.bank1.assets.customerOverdrafts[1].amount
  let amount3 = parties.bank1.liabilities.customerDeposits[0].amount
  let amount4 = parties.bank1.liabilities.customerDeposits[1].amount
  setTotal(
    amount1 + amount2 + amount3 + amount4)
}, [parties])
  return (
    <Box>
      <Toolbar
        sx={{
          // backgroundColor: "#735c51",
          // backgroundColor: "#62120E",
          backgroundColor: "#F2EECB",
          // boxShadow: "0px 6px 10px -7px gray",
          padding: "5px",
        }}
      >
        Credit: {total}
        {/* <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "60px"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: toolbarTextColor, fontSize: 15, fontWeight: "bold" }}
            >
              Quotes
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {cities.map((city, i) => (
                <Typography key={i} sx={{ color: toolbarTextColor, fontSize: 12 }}>
                  {capitalize(city.city)}: {city.certain ? "Certain" : "Moveable"}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: toolbarTextColor, fontSize: 15, fontWeight: "bold" }}
            >
              Rates (Ecus to Marc)
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {rates.map((city, i) => (
                <Typography key={i} sx={{ color: toolbarTextColor, fontSize: 12 }}>
                  {capitalize(city.city)}: {city.price}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ color: toolbarTextColor, fontSize: 15, fontWeight: "bold" }}
            >
              Records
            </Typography>
            <Box sx={{overflowX: "hidden", display: "flex", flexDirection: "column-reverse"}}>
              {records.length > 0 ? (
                records.map((record, i) => (
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ color: toolbarTextColor, fontSize: 12 }}
                    key={i}
                  >
                    {record}
                  </Typography>
                ))
              ) : (
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: toolbarTextColor, fontSize: 12 }}
                >
                  Trade to start
                </Typography>
              )}
            </Box>
          </Box>
          <Tooltip title="refresh">
            <IconButton onClick={() => dispatch(reset())}>
              <RefreshIcon/>
            </IconButton>
          </Tooltip>
        </Box> */}
      </Toolbar>
    </Box>
  );
}
