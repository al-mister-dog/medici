import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import BalanceSheet from "../../ui/BalanceSheet";

const Medici: React.FunctionComponent<{
  selectPlayer: (a: any) => void;
}> = ({ selectPlayer }) => {
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);

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
          <BalanceSheet bank={me} selectPlayer={selectPlayer} />
          <BalanceSheet bank={you} selectPlayer={selectPlayer} />
          <BalanceSheet bank={federigo} selectPlayer={selectPlayer} />
        </div>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <BalanceSheet bank={salviati} selectPlayer={selectPlayer} />
          <BalanceSheet bank={tomasso} selectPlayer={selectPlayer} />
          <BalanceSheet bank={piero} selectPlayer={selectPlayer} />
        </div>
      </div>
    </>
  );
};

export default Medici;
