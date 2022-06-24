import { Box, Typography } from "@mui/material";
import {deCamelize} from "../../helpers"
const toolbarTextColor = "#f2eecb";

type Account = {
  [index: string]: any;
};

const Side: React.FunctionComponent<{
  side: string;
  instruments: any;
}> = ({ side, instruments }) => {
  return (
    <Box
      p={1}
      flex={"auto"}
      style={{
        borderLeft: `1px solid ${toolbarTextColor}`,
        height: "50%",
        width: "50%",
      }}
    >
      <Typography
        style={{
          fontSize: 12,
          color: toolbarTextColor,
          fontWeight: 500,
          margin: 0,
        }}
      >
        {side}
      </Typography>

      {Object.entries(instruments).map(([k, v]) => {
        return (
          Array.isArray(v) &&
          v.length > 0 && (
            <div
              style={{
                margin: 0,
                padding: 0,
                textAlign: "left",
                fontSize: 12,
                color: toolbarTextColor,
                fontWeight: 500,
              }}
            >
              <Typography sx={{ margin: 0, padding: 0, fontSize: 12, }}>{deCamelize(k)}</Typography>
              {v.map((account) => {
                return (
                  <Typography
                    key={account.id}
                    style={{ margin: 0, padding: 0, fontSize: 10 }}
                  >
                    <span>{account.id}: </span>
                    <span>${account.amount}</span>
                  </Typography>
                );
              })}
            </div>
          )
        );
      })}
    </Box>
  );
};

export default Side;

// {instruments.customerDeposits?.length > 0 && (
//   <div
//     style={{
//       margin: 0,
//       padding: 0,
//       textAlign: "left",
//       fontSize: 12,
//       color: toolbarTextColor,
//       fontWeight: 500,
//       fontFamily:
//         '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//     }}
//   >
//     <Typography style={{ margin: 0, padding: 0 }}>
//       Customer Deposits
//     </Typography>
//     {instruments.customerDeposits?.map((account: Account, i: number) => {
//       return (
//         <Typography key={account.id} style={{ margin: 0, padding: 0 }}>
//           {/* <span>
//             {side === "liabilities"
//               ? `Due to ${account.dueTo}: `
//               : `Due from ${account.dueFrom}: `}
//           </span> */}

//           <span>{account.id}: </span>
//           <span>${account.amount}</span>
//         </Typography>
//       );
//     })}
//   </div>
// )}
// {instruments.bankDeposits?.length > 0 && (
//   <div
//     style={{
//       margin: 0,
//       padding: 0,
//       textAlign: "left",
//       fontSize: 12,
//       color: toolbarTextColor,
//       fontWeight: 500,
//       fontFamily:
//         '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//     }}
//   >
//     <Typography style={{ margin: 0, padding: 0 }}>
//       Bank Deposits
//     </Typography>

//     {instruments.bankDeposits?.map((account: Account, i: number) => {
//       return (
//         <Typography key={i} style={{ margin: 0, padding: 0 }}>
//           <span>{account.id}: </span>
//           <span>{account.amount}</span>
//         </Typography>
//       );
//     })}
//   </div>
// )}

//MAP THRU OBJECT KEYS REFERENCE
// {Object.entries(instruments).map(([k, v]) => {
//   return (Array.isArray(v) && v.length > 0) && (
//     <div>
//       <h6>{k}</h6>
//       {
//         v.map((a) => {
//           return (
//             <>
//               {a.id}: {a.amount}
//             </>
//           );
//         })}
//     </div>
//   );
// })}
