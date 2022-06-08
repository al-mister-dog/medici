import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import { useState } from "react";
import Index from "../module/Index";
import { texts1 } from "../assets/texts";

function App() {
  const { me, salviati } = useAppSelector(selectTraders);
  const { you } = useAppSelector(selectBankers);
  const [selected, setSelected] = useState<string>("me");
  const florencePlayers = [me, you];
  const lyonsPlayers = [salviati];
  function selectPlayer(player: any) {
    setSelected(player.id);
  }

  return (
    <Index
      texts={texts1}
      florencePlayers={florencePlayers}
      lyonsPlayers={lyonsPlayers}
      selected={selected}
      selectPlayer={selectPlayer}
    />
  );
}

export default App;
