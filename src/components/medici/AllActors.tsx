import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  //   decrement,
  //   increment,
  //   incrementByAmount,
  //   incrementAsync,
  //   incrementIfOdd,
  updateActors,
  selectState,
} from "../../features/counter/counterSlice";
import { useState } from "react";
import BalanceSheet from "../ui/BalanceSheet";
import {
  trade,
  drawBill,
  remitBill,
  // federigo,
  // me,
  // piero,
  // salviati,
  // tomasso,
  // you,
} from "./functions";

const Medici: React.FunctionComponent<{
  selectActor: (a: any) => void;
  addToBills: (bill: any) => void;
}> = ({ selectActor, addToBills }) => {
  const [stateCounter, setStateCounter] = useState(0);
  const { me, you, salviati, federigo, piero, tomasso } =
    useAppSelector(selectState);
  const dispatch = useAppDispatch();
  function addBill(importer: any, exporter: any, amount: number) {
    const date = new Date().toISOString();
    const bill = {
      id: date,
      dueTo: exporter.id,
      dueFrom: importer.id,
      city: importer.city,
      amount: amount,
      status: false,
    };
    addToBills(bill);
  }

  function f1() {
    // trade(salviati, me, 1);
    addBill(salviati, me, 1);
    dispatch(updateActors({ importer: salviati, exporter: me, amount: 1 }));
    setStateCounter(stateCounter + 1);
  }
  function f2() {
    drawBill(me, you, me.assets[0]);
    setStateCounter(stateCounter + 1);
    console.log(me);
  }
  function f3() {
    remitBill(you, tomasso, you.assets[0]);
    setStateCounter(stateCounter + 1);
  }
  function f4() {
    drawBill(tomasso, salviati, tomasso.assets[0]);
    setStateCounter(stateCounter + 1);
  }
  function f5() {
    trade(federigo, piero, 1);
    addBill(federigo, piero, 1);
    setStateCounter(stateCounter + 1);
  }
  function f6() {
    drawBill(piero, tomasso, piero.assets[0]);
    setStateCounter(stateCounter + 1);
  }
  function f7() {
    remitBill(tomasso, you, tomasso.assets[1]);
    setStateCounter(stateCounter + 1);
  }
  function f8() {
    drawBill(you, federigo, you.assets[0]);
    setStateCounter(stateCounter + 1);
  }

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
          <h3>Florence</h3>
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
          <h3>Lyons</h3>
          <BalanceSheet bank={salviati} selectActor={selectActor} />
          <BalanceSheet bank={tomasso} selectActor={selectActor} />
          <BalanceSheet bank={piero} selectActor={selectActor} />
        </div>
      </div>

      <div>
        <button onClick={f1}>1</button>
        <button onClick={f2}>2</button>
        <button onClick={f3}>3</button>
        <button onClick={f4}>4</button>
        <button onClick={f5}>5</button>
        <button onClick={f6}>6</button>
        <button onClick={f7}>7</button>
        <button onClick={f8}>8</button>
      </div>
    </>
  );
};

export default Medici;
