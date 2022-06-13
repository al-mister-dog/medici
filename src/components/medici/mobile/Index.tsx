import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import Introduction from "../ui/Introduction";
import { Box } from "@mui/material";
import Player from "./sidepanel/Player";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import Refresh from "./toolbars/RefreshToolbar";

const SelectedPlayer = ({ player }: { player: any }) => {
  return (
    <Box style={{ margin: "auto" }}>
      <Player selected={player} />
    </Box>
  );
};

const Index: React.FunctionComponent<{
  texts: any;
  florencePlayers: any;
  lyonsPlayers: any;
  selected: string;
  selectPlayer: (v: any) => void;
  notifications?: boolean;
}> = ({
  texts,
  florencePlayers,
  lyonsPlayers,
  selected,
  selectPlayer,
  notifications,
}) => {
  const { me, salviati, federigo, piero } = useAppSelector(selectTraders);
  const { you, tomasso } = useAppSelector(selectBankers);

  return (
    <>
      <Introduction texts={texts} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#757575",
        }}
      >
        <Box
          sx={{
            background: "#F2EECB",
          }}
        >
          {selected === "me" && <SelectedPlayer player={me} />}
          {selected === "you" && <SelectedPlayer player={you} />}
          {selected === "salviati" && <SelectedPlayer player={salviati} />}
          {selected === "tomasso" && <SelectedPlayer player={tomasso} />}
          {selected === "piero" && <SelectedPlayer player={piero} />}
          {selected === "federigo" && <SelectedPlayer player={federigo} />}
        </Box>
        {notifications ? <Notifications /> : <Refresh />}
        {/* <Box> */}
        <Board
          florencePlayers={florencePlayers}
          lyonsPlayers={lyonsPlayers}
          selectPlayer={selectPlayer}
        />
        {/* </Box> */}
      </Box>
    </>
  );
};

export default Index;
