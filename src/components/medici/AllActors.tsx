import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../features/actors/actorsSlice";
import BalanceSheet from "../ui/BalanceSheet";

const Medici: React.FunctionComponent<{
  selectActor: (a: any) => void;
  addToBills: (bill: any) => void;
}> = ({ selectActor, addToBills }) => {
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
          <BalanceSheet bank={me} selectActor={selectActor} />
          <BalanceSheet bank={you} selectActor={selectActor} />
          <BalanceSheet bank={federigo} selectActor={selectActor} />
        </div>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <BalanceSheet bank={salviati} selectActor={selectActor} />
          <BalanceSheet bank={tomasso} selectActor={selectActor} />
          <BalanceSheet bank={piero} selectActor={selectActor} />
        </div>
      </div>
    </>
  );
};

export default Medici;
