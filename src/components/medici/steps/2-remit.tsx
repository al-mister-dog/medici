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

const texts = {
  title: `Remitting Bills`,
  paragraphs: [
    `I (me) have now been paid after presenting the bill to the exchange banker 
    (you) and receiving 64 ecus in return. However, this 64 ecus came out of 
    the exchange banker's equity (from their own funds) which is not very good 
    business. The exchange banker will need to make back these funds and preferably 
    return a profit. To make back these funds the exchange banker needs to send the 
    bill to Salviati using a process called remittance.`,
    `The exchange banker in Florence (you) has an associate exchange banker in Lyons
    (Tomasso), where Salviati lives. The bill will be sent (remitted) to Tomasso who 
    can present the bill to Tomasso and receive the payment required, completing 
    this particular transaction. How a profit is made will be explained in the next 
    module.`,
    `There are now four players on the board; 'Me' and 'You' in Florence, and Tomasso 
    (exchange banker) and Salviati (importer) in Lyons. In Davanzati's example 
    Tomasso receives from 'You' the bill due from Salviati and then presents it to Salviati,
    receiving 1 gold marc (or its Lyonaise equivelant) in return`,
  ],
  assignment: `Assignment: Get 'You' to remit the bill to Tomasso and have Tomasso draw 
  the bill on Salviati. Previous steps should have been completed. If they have not been 
  completed then go back to the beginning of this module. Click refresh to reset the board.`,
};

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
  const lyonsPlayers = [salviati, tomasso]
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
      <Introduction texts={texts}/>
      <Box
        style={{
          display: "flex",
          height: "65vh",
          background: "#F3F6F9",
          borderBottomLeftRadius: "15px",
        }}
      >
        <Box style={{ width: "60%" }}>
          <BoardPlayers florencePlayers={florencePlayers} lyonsPlayers={lyonsPlayers} selectPlayer={selectPlayer} />
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
          {selected === "me" && <SelectedPlayer player={me} />}
          {(selected === "you" || !selected) && <SelectedPlayer player={you} />}
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
