import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  trade,
  drawBill,
  remitBill,
  selectTraders,
  selectBankers,
} from "../../features/actors/actorsSlice";

import { Box } from "@mui/material";
import { useState } from "react";
import "../../App.css";
import AllActors from "./AllActors";
import Actor from "./sidepanel/Actor";

interface Bill {
  id: string;
  dueTo: string;
  dueFrom: string;
  city: string;
  amount: number;
  status: boolean;
}

const SelectedActor = ({ actor }: { actor: any }) => {
  return (
    <Box style={{ width: "95%", margin: "auto" }}>
      <Actor selected={actor} />
    </Box>
  );
};

function App() {
  const dispatch = useAppDispatch();
  // const [stateCounter, setStateCounter] = useState(0);
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);

  const [selected, setSelected] = useState<string>("");
  const [bills, setBills] = useState<Bill[]>([]);

  function selectActor(actor: any) {
    setSelected(actor.id);
  }
  function addToBills(bill: any) {
    setBills([...bills, bill]);
  }

  const [stateCounter, setStateCounter] = useState(0);
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
    addBill(salviati, me, 1);
    dispatch(trade({ importer: salviati, exporter: me, amount: 1 }));
  }
  function f2() {
    dispatch(drawBill({payee:me, drawee:you, bill: me.assets[0]}));
  }
  function f3() {
    dispatch(remitBill({presenter: you, presentee: tomasso, bill: you.assets[0]}))
  }
  function f4() {
    dispatch(drawBill({payee:tomasso, drawee:salviati, bill: tomasso.assets[0]}));
  }
  function f5() {
    dispatch(trade({ importer: federigo, exporter: piero, amount: 1 }));
  }
  function f6() {
    dispatch(drawBill({payee:piero, drawee:tomasso, bill: piero.assets[0]}));
  }
  function f7() {
    dispatch(remitBill({presenter: tomasso, presentee: you, bill: tomasso.assets[1]}));
  }
  function f8() {
    dispatch(drawBill({payee:you, drawee:federigo, bill: you.assets[0]}));
  }

  return (
    <Box className="App" style={{ background: "#F3F6F9", height: "100vh" }}>
      <Box style={{ display: "flex" }}>
        <Box style={{ width: "60%" }}>
          <AllActors selectActor={selectActor} addToBills={addToBills} />
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "100vh",
            
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "flexStart",
            background: "white",
          }}
        >
          {selected === "me" && <SelectedActor actor={me} />}
          {selected === "you" && <SelectedActor actor={you} />}
          {selected === "salviati" && <SelectedActor actor={salviati} />}
          {selected === "tomasso" && <SelectedActor actor={tomasso} />}
          {selected === "piero" && <SelectedActor actor={piero} />}
          {selected === "federigo" && <SelectedActor actor={federigo} />}
        </Box>
      </Box>
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
    </Box>
  );
}

export default App;
