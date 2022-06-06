import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../features/actors/actorsSlice";

import { Box } from "@mui/material";
import { useState } from "react";
import "../../App.css";
import AllActors from "./AllActors";
import Actor from "./sidepanel/Actor";
import Notifications from "./Notifications"

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


  return (
    <Box className="App" style={{ background: "#F3F6F9", height: "100vh" }}>
      <Notifications />
      <Box style={{ display: "flex" }}>
        <Box style={{ width: "60%" }}>
          <AllActors selectActor={selectActor} addToBills={addToBills} />
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "100vh",
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
    </Box>
  );
}

export default App;
