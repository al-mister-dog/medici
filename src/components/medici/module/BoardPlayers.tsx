import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import Board from "./Board"

const BoardPlayers: React.FunctionComponent<{
  florencePlayers: any,
  lyonsPlayers: any,
  selectPlayer: (a: any) => void;
}> = ({ florencePlayers, lyonsPlayers, selectPlayer }) => {
  // const { me, salviati } = useAppSelector(selectTraders);
  // const { you } = useAppSelector(selectBankers);
  // const florencePlayers = [me, you]
  // const lyonsPlayers = [salviati]
  return (
    <>
      <Board florencePlayers={florencePlayers} lyonsPlayers={lyonsPlayers} selectPlayer={selectPlayer}/>
    </>
  );
};

export default BoardPlayers;