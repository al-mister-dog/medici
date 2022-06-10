import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import SideBalance from "./SideBalance";
import {capitalize} from "../../helpers"
const toolbarTextColor = '#f2eecb'
const BalanceSheetTrader: React.FunctionComponent<{
  bank: any;
  selectPlayer: (b: any) => void;
}> = ({ bank, selectPlayer }) => {
  
  return (
    <Card
      style={{
        flex: "0 0 auto",
        width: "70vw",
        borderRadius: 12,
        textAlign: "center",
        margin: "5px",
        backgroundColor: "#62120E"
      }}
      sx={{
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
        },
        "&:active": {
          border: "1px solid blue",
        },
        cursor: "pointer",
      }}
      onClick={() => selectPlayer(bank)}
    >
      <CardContent sx={{padding: 1}}>
        <Typography
          style={{
            fontSize: 15,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            margin: 0,
            color: toolbarTextColor,
          }}
        >
          {capitalize(bank.id)}
        </Typography>
        <span
          style={{
            fontSize: 12,
            color: toolbarTextColor,
            marginBottom: "0.875em",
          }}
        >
          {capitalize(bank.city)}
        </span>
      </CardContent>
      <Divider light />
      <Box display={"flex"}>
        <SideBalance side="assets" bills={bank.assets} coins={bank.coinAsset} />
        <SideBalance
          side="liabilities"
          bills={bank.liabilities}
          coins={bank.coinLiability}
        />
      </Box>
    </Card>
  );
};

export default BalanceSheetTrader;
