import { Box } from "@mui/material";

type Account = {
  [index: string]: any;
};

const Side: React.FunctionComponent<{
  side: string;
  bills: any;
  coins: any;
}> = ({ side, bills, coins }) => {
  return (
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
        {side}
      </p>

      {bills.length > 0 && (
        <div
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
          {bills.map((account: Account, i: number) => {
            return account.paid ? (
              <p key={account.id} style={{ margin: 0, padding: 0 }}>
                <s>
                  <span>
                    {side === "liabilities"
                      ? `Due to ${account.dueTo}: `
                      : `Due from ${account.dueFrom}: `}
                  </span>

                  <span>{account.amount}</span>
                </s>
              </p>
            ) : (
              <p key={account.id} style={{ margin: 0, padding: 0 }}>
                <span>
                  {side === "liabilities"
                    ? `Due to ${account.dueTo}: `
                    : `Due from ${account.dueFrom}: `}
                </span>
                <span>{account.amount}</span>
              </p>
            );
          })}
        </div>
      )}
      {coins.length > 0 && (
        <div
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
          <p style={{ margin: 0, padding: 0 }}>Coins</p>

          {coins.map((account: Account, i: number) => {
            return (
              <p key={i} style={{ margin: 0, padding: 0 }}>
                <span>{account.coinType}: </span>
                <span>{account.amount}</span>
              </p>
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default Side;
