import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import Introduction from "../ui/Introduction";
import { Box } from "@mui/material";
import Player from "../module/Player";
import Board from "../module/Board";
import Notifications from "./NotificationsToolbar";
import Refresh from "./RefreshToolbar";

const SelectedPlayer = ({ player }: { player: any }) => {
  return (
    <Box style={{ width: "95%", margin: "auto" }}>
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
      <Box sx={{ paddingLeft: "75px", paddingRight: "75px", marginTop: "50px" }}>
        <Introduction texts={texts} />
      </Box>

      {notifications ? <Notifications /> : <Refresh />}
      <Box
        style={{
          display: "flex",
          background: "#F3F6F9",
          height: "60vh",
        }}
      >
        <Box style={{ width: "60%", overflowX: "hidden" }}>
          <Board
            florencePlayers={florencePlayers}
            lyonsPlayers={lyonsPlayers}
            selectPlayer={selectPlayer}
          />
        </Box>
        <Box
          sx={{
            width: "40%",
            background: "white",
            overflowX: "hidden",
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
    </>
  );
};

export default Index;
