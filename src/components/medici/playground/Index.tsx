import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";

import { Box } from "@mui/material";
import { useState } from "react";
import AllPlayers from "./AllPlayers";
import Player from "./Player";
import Notifications from "./Toolbar"

const SelectedPlayer = ({ player }: { player: any }) => {
  return (
    <Box style={{ width: "95%", margin: "auto" }}>
      <Player selected={player} />
    </Box>
  );
};

function App() {
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);
  const [selected, setSelected] = useState<string>("");

  function selectPlayer(player: any) {
    setSelected(player.id);
  }
  
  return (
    <Box style={{ background: "#F3F6F9" }}>
      <Notifications />
      <Box style={{ display: "flex", height: "100vh"}}>
        <Box style={{ width: "60%" }}>
          <AllPlayers selectPlayer={selectPlayer} />
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "100vh",
            background: "white",
          }}
        >
          {selected === "me" && <SelectedPlayer player={me} />}
          {selected === "you" && <SelectedPlayer player={you} />}
          {selected === "salviati" && <SelectedPlayer player={salviati} />}
          {selected === "tomasso" && <SelectedPlayer player={tomasso} />}
          {selected === "piero" && <SelectedPlayer player={piero} />}
          {selected === "federigo" && <SelectedPlayer player={federigo} />}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
