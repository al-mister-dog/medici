import BalanceSheet from "../ui/desktop/BalanceSheet";

const Board: React.FunctionComponent<{
  config?: any
  customerParties: any;
  bankParties: any;
  selectParty: (a: any) => void;
}> = ({ config, customerParties, bankParties, selectParty }) => {
  
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
            <BalanceSheet key={i} config={config} bank={player} selectParty={selectParty} />
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
            <BalanceSheet key={i} config={config} bank={player} selectParty={selectParty} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
