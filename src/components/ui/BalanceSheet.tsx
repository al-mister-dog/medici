import { Box, Card, CardContent, Divider } from "@mui/material";
import SideBalance from "./SideBalance";

const BalanceSheetTrader: React.FunctionComponent<{
  bank: any;
  selectActor: (b: any) => void;
}> = ({ bank, selectActor }) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Card
      style={{
        borderRadius: 12,
        minWidth: 300,
        textAlign: "center",
        margin: 25,
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
      onClick={() => selectActor(bank)}
    >
      <CardContent>
        <h3
          style={{
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {capitalize(bank.id)}
        </h3>
        <span
          style={{
            fontSize: 14,
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
