import { PartyModeOutlined } from "@mui/icons-material";
import BalanceSheet from "../ui/desktop/BalanceSheet";

const Board: React.FunctionComponent<{
  customerParties: any;
  bankParties: any;
  selectParty: (a: any) => void;
}> = ({ customerParties, bankParties, selectParty }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {customerParties.map((player: any, i: any) => (
            <BalanceSheet key={i} bank={player} selectParty={selectParty} />
          ))}
        </div>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {bankParties.map((player: any, i: any) => (
            <BalanceSheet key={i} bank={player} selectParty={selectParty} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
