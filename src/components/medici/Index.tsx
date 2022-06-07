import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../features/actors/actorsSlice";

import { Box } from "@mui/material";
import { useState } from "react";
import "../../App.css";
import AllActors from "./AllActors";
import Actor from "./playground/Actor";
import Notifications from "./Toolbar"

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

  function selectActor(actor: any) {
    setSelected(actor.id);
  }
  
  return (
    <Box style={{ background: "#F3F6F9" }}>
      <Notifications />
      <Box style={{ display: "flex", height: "100vh"}}>
        <Box style={{ width: "60%" }}>
          <AllActors selectActor={selectActor} />
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
