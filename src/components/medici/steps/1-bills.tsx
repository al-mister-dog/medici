import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import Introduction from "../ui/Introduction";
import { Box } from "@mui/material";
import { useState } from "react";
import Player from "../module/Player";
import BoardPlayers from "../module/BoardPlayers";
import {texts1} from "../assets/texts"

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
  const florencePlayers = [me, you]
  const lyonsPlayers = [salviati]
  function selectPlayer(player: any) {
    setSelected(player.id);
  }

  return (
    <Box
      style={{
        width: "90%",
        margin: "auto",
        border: "1px solid #F3F6F9",
        borderRadius: "15px",
      }}
    >
      <Introduction texts={texts1}/>
      <Box
        style={{
          display: "flex",
          height: "65vh",
          background: "#F3F6F9",
          borderBottomLeftRadius: "15px",
        }}
      >
        <Box style={{ width: "60%" }}>
          <BoardPlayers florencePlayers={florencePlayers} lyonsPlayers={lyonsPlayers}  selectPlayer={selectPlayer} />
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "65vh",
            background: "white",
            borderBottomRightRadius: "15px",
            overflowX: "hidden",
          }}
        >
          {(selected === "me" || !selected) && <SelectedPlayer player={me} />}
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
