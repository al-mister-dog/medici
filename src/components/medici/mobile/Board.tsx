import BalanceSheet from "../../ui-mobile/BalanceSheet";
import Grid from "@mui/material/Grid";
const Board: React.FunctionComponent<{
  florencePlayers: any;
  lyonsPlayers: any;
  selectPlayer: (a: any) => void;
}> = ({ florencePlayers, lyonsPlayers, selectPlayer }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "50%",
            // margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {florencePlayers.map((player: any, i: any) => (
            <BalanceSheet key={i} bank={player} selectPlayer={selectPlayer} />
          ))}
        </div>
        <div
          style={{
            width: "50%",
            // margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {lyonsPlayers.map((player: any, i: any) => (
            <BalanceSheet key={i} bank={player} selectPlayer={selectPlayer} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
