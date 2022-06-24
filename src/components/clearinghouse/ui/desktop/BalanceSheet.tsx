import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import SideBalance from "./SideBalance";
import { capitalize } from "../../helpers";
const toolbarTextColor = '#f2eecb'
const BalanceSheetTrader: React.FunctionComponent<{
  bank: any;
  selectParty: (b: any) => void;
}> = ({ bank, selectParty }) => {
  return (
    <Card
      style={{
        borderRadius: 12,
        minWidth: 300,
        textAlign: "center",
        margin: 25,
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
      onClick={() => selectParty(bank)}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            color: toolbarTextColor,
            // marginTop: 8,
            // marginBottom: 0,
          }}
        >
          {capitalize(bank.id)}
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            color: toolbarTextColor,
          }}
        >
          {/* {capitalize(bank.city)} */}
        </Typography>
      </CardContent>
      <Box display={"flex"} sx={{borderTop: `1px solid ${toolbarTextColor}`}}>
        <SideBalance side="assets" instruments={bank.assets} />
        <SideBalance
          side="liabilities"
          instruments={bank.liabilities}
        />
      </Box>
    </Card>
  );
};

export default BalanceSheetTrader;
