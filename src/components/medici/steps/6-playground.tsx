import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import { useState } from "react";
import Index from "../module/Index";
import { texts5 } from "../assets/texts";

function App() {
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);
  const [selected, setSelected] = useState<string>("me");
  const florencePlayers = [me, you, federigo];
  const lyonsPlayers = [salviati, tomasso, piero];
  function selectPlayer(player: any) {
    setSelected(player.id);
  }

  return (
    <Index
      texts={texts5}
      florencePlayers={florencePlayers}
      lyonsPlayers={lyonsPlayers}
      selected={selected}
      selectPlayer={selectPlayer}
      notifications={true}
    />
  );
}

export default App;
