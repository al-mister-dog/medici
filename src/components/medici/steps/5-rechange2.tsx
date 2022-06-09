import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import { useState } from "react";
import Index from "../mobile/Index";
import { texts4 } from "../assets/texts";

function App() {
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);
  const [selected, setSelected] = useState<string>("tomasso");
  const florencePlayers = [me, you, federigo];
  const lyonsPlayers = [salviati, tomasso, piero];
  function selectPlayer(player: any) {
    setSelected(player.id);
  }

  return (
    <Index
      texts={texts4}
      florencePlayers={florencePlayers}
      lyonsPlayers={lyonsPlayers}
      selected={selected}
      selectPlayer={selectPlayer}
      notifications={true}
      />
  );
}

export default App;
