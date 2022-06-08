// import { useAppSelector } from "../../../app/hooks";
// import {
//   selectTraders,
//   selectBankers,
// } from "../../../features/players/playersSlice";

// import { Box } from "@mui/material";
// import { useState } from "react";
// import BoardPlayers from "../module/BoardPlayers";
// import Player from "../module/Player";
// import Notifications from "../module/Toolbar"

// const SelectedPlayer = ({ player }: { player: any }) => {
//   return (
//     <Box style={{ width: "95%", margin: "auto" }}>
//       <Player selected={player} />
//     </Box>
//   );
// };

// function App() {
//   const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
//   const { you, tomasso } = useAppSelector(selectBankers);
//   const [selected, setSelected] = useState<string>("");
//   const florencePlayers = [me, you, federigo]
//   const lyonsPlayers = [tomasso, salviati, piero]
//   function selectPlayer(player: any) {
//     setSelected(player.id);
//   }
  
//   return (
//     <Box style={{ background: "#F3F6F9" }}>
//       <Notifications />
//       <Box style={{ display: "flex", height: "100vh"}}>
//         <Box style={{ width: "60%" }}>
//           <BoardPlayers florencePlayers={florencePlayers} lyonsPlayers={lyonsPlayers} selectPlayer={selectPlayer} />
//         </Box>
//         <Box
//           sx={{
//             width: "40%",
//             height: "100vh",
//             background: "white",
//           }}
//         >
//           {(selected === "me" || !selected) && <SelectedPlayer player={me} />}
//           {selected === "you" && <SelectedPlayer player={you} />}
//           {selected === "salviati" && <SelectedPlayer player={salviati} />}
//           {selected === "tomasso" && <SelectedPlayer player={tomasso} />}
//           {selected === "piero" && <SelectedPlayer player={piero} />}
//           {selected === "federigo" && <SelectedPlayer player={federigo} />}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default App;
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
import Notifications from "../module/Toolbar"

const texts = {
  title: `Playground`,
  paragraphs: [
    `Davanzati's exchange has been completed (history has repeated itself). 'You' have 
    managed to get around usury laws and turn a profit on exchanging bills. The next step 
    would be for 'You' and Tomasso to share their spoils, most likely through corresponding
    (nostro-vostro) accounts. Correspondent banking is explained in another module on this course.`,
    `However, this particular set of exchanges is not the only way to turn a profit. Can you
    figure any other ways to make a profit through the art of sixteenth century exchange banking?`
  ],
  assignment: `Assignment: Go through Davanzati's example again or try some different exchanges out.
  You can toggle the certainty quotes (altering the network hierarchy) or alter the echange rates. 
  Then move on to the next module in the course`,
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
  const florencePlayers = [me, you, federigo]
  const lyonsPlayers = [salviati, tomasso, piero]
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
      <Notifications />
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
