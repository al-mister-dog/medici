import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import { useState } from "react";
import Index from "../mobile/Index";
import { texts2 } from "../assets/texts";

function App() {
  const { me, salviati } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);
  const [selected, setSelected] = useState<string>("you");
  const florencePlayers = [me, you];
  const lyonsPlayers = [salviati, tomasso];
  function selectPlayer(player: any) {
    setSelected(player.id);
  }

  return (
    <Index
      texts={texts2}
      florencePlayers={florencePlayers}
      lyonsPlayers={lyonsPlayers}
      selected={selected}
      selectPlayer={selectPlayer}
    />
  );
}

export default App;
