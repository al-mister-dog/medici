import { Box, Card, CardContent, Divider } from "@mui/material";

type Account = {
  [index: string]: any;
};

const BalanceSheetTrader: React.FunctionComponent<{
  bank: any;
  selectActor: (b: any) => void;
}> = ({ bank, selectActor }) => {
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
          {bank.id}
        </h3>
        <span
          style={{
            fontSize: 14,
            color: "gray",
            marginBottom: "0.875em",
          }}
        >
          {bank.city}
        </span>
      </CardContent>
      <Divider light />
      <Box display={"flex"}>
        <Box
          p={1}
          flex={"auto"}
          style={{
            borderColor: "rgba(0, 0, 0, 0.08)",
            height: "50%",
            width: "50%",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "gray",
              fontWeight: 500,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              margin: 0,
            }}
          >
            Assets
          </p>
          {bank.assets.map((account: Account, i: number) => {
            return (
              <div
                key={i}
                style={{
                  margin: 0,
                  padding: 0,
                  textAlign: "left",
                  fontSize: 12,
                  color: "gray",
                  fontWeight: 500,
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                }}
              >
                <p style={{ margin: 0, padding: 0 }}>Bills</p>
                <p key={account.id} style={{ margin: 0, padding: 0 }}>
                  <span>Due from {account.dueFrom}: </span>
                  <span>{account.amount}</span>
                </p>
              </div>
            );
          })}
        </Box>
        <Box
          p={1}
          flex={"auto"}
          style={{
            borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
            borderColor: "rgba(0, 0, 0, 0.08)",
            height: "50%",
            width: "50%",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "gray",
              fontWeight: 500,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              margin: 0,
            }}
          >
            Liabilities
          </p>
          {bank.liabilities.map((account: Account, i: number) => {
            return (
              <div
                key={i}
                style={{
                  margin: 0,
                  padding: 0,
                  textAlign: "left",
                  fontSize: 12,
                  color: "gray",
                  fontWeight: 500,
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                }}
              >
                <p style={{ margin: 0, padding: 0 }}>Bills</p>

                <p key={account.id} style={{ margin: 0, padding: 0 }}>
                  <span>Due to {account.dueTo}: </span>
                  <span>{account.amount}</span>
                </p>
              </div>
            );
          })}
        </Box>
      </Box>
    </Card>
  );
};

export default BalanceSheetTrader;
