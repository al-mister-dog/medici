// import { useAppSelector, useAppDispatch } from "../../../app/hooks";
// import {
//   selectRecords,
//   selectConditions,
//   reset,
// } from "../../../features/players/playersSlice";
// import RefreshIcon from '@mui/icons-material/Refresh';
// import { IconButton, AppBar, Box, Toolbar, Typography, Tooltip } from "@mui/material";

// export default function ButtonAppBar() {
//   const dispatch = useAppDispatch()
//   const records = useAppSelector(selectRecords);
//   const { certaintyQuotes, exchangeRates, currencies } =
//     useAppSelector(selectConditions);

//   const cities = Object.keys(certaintyQuotes).map((c) => ({
//     city: c,
//     certain: certaintyQuotes[c],
//   }));
//   const rates = Object.keys(exchangeRates).map((c) => ({
//     city: c,
//     price: exchangeRates[c],
//   }));

//   return (
//     <Box sx={{ flexGrow: 1 }}>

//         <Toolbar sx={{ backgroundColor: "white", boxShadow: "0px 10px 13px -7px #F3F6F9" }}>
//           <Box sx={{ display: "flex", flexGrow: 1 }}>
//             <Typography variant="h6" component="div" sx={{color: "black"}}>
//               Quotes:
//             </Typography>
//             {cities.map((city, i) => (
//               <Typography key={i} sx={{ margin: "5px", color: "black" }}>
//                 {city.city}: {city.certain ? "Certain" : "Moveable"}
//               </Typography>
//             ))}
//           </Box>
//           <Box sx={{ display: "flex", flexGrow: 1 }}>
//             <Typography variant="h6" component="div" sx={{color: "black"}}>
//               Rates (Ecus to Marc):
//             </Typography>
//             {rates.map((city, i) => (
//               <Typography key={i} sx={{ margin: "5px", color: "black" }}>
//                 {city.city}: {city.price}
//               </Typography>
//             ))}
//           </Box>
//           <Typography variant="body1" component="div" sx={{ flexGrow: 1, color: "black" }}>
//             {records.length > 0
//               ? `${records[records.length - 1]}`
//               : `Trade to start`}
//           </Typography>
//           <Tooltip title="refresh">
//           <IconButton onClick={() => dispatch(reset())}>
//               <RefreshIcon/>
//           </IconButton>
//           </Tooltip>

//         </Toolbar>

//     </Box>
//   );
// }
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectRecords,
  selectConditions,
  reset,
} from "../../../features/players/playersSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  IconButton,
  Box,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

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
          backgroundColor: "white",
          boxShadow: "0px 10px 13px -7px #F3F6F9",
          padding: "5px",
        }}
      >
        <Box
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
              sx={{ color: "black", fontSize: 15, fontWeight: "bold" }}
            >
              Quotes
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {cities.map((city, i) => (
                <Typography key={i} sx={{ color: "black", fontSize: 12 }}>
                  {city.city}: {city.certain ? "Certain" : "Moveable"}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "black", fontSize: 15, fontWeight: "bold" }}
            >
              Rates (Ecus to Marc)
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {rates.map((city, i) => (
                <Typography key={i} sx={{ color: "black", fontSize: 12 }}>
                  {city.city}: {city.price}
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
              sx={{ color: "black", fontSize: 15, fontWeight: "bold" }}
            >
              Records
            </Typography>
            <Box sx={{overflowX: "hidden"}}>
              {records.length > 0 ? (
                records.map((record, i) => (
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ color: "gray", fontSize: 12 }}
                    key={i}
                  >
                    {record}
                  </Typography>
                ))
              ) : (
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: "gray", fontSize: 12 }}
                >
                  Trade to start
                </Typography>
              )}
            </Box>
          </Box>
          <Tooltip title="refresh">
            <IconButton onClick={() => dispatch(reset())}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </Box>
  );
}
