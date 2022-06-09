import { Box, Card, CardContent, Divider } from "@mui/material";
import SideBalance from "./SideBalance";
import {capitalize} from "../../helpers"

const BalanceSheetTrader: React.FunctionComponent<{
  bank: any;
  selectPlayer: (b: any) => void;
}> = ({ bank, selectPlayer }) => {
  
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 12,
        textAlign: "center",
        margin: "10px, 0px",
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
        <h3
          style={{
            fontSize: 15,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            margin: 0
          }}
        >
          {capitalize(bank.id)}
        </h3>
        <span
          style={{
            fontSize: 12,
            color: "gray",
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
