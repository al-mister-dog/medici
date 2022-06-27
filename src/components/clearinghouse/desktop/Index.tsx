import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectParties,
  createNewCustomer,
} from "../../../features/clearinghouse/clearinghouseSlice";
import Introduction from "../ui/Introduction";

import { Box, Button } from "@mui/material";
import Player from "./sidepanel/Player";
import Board from "./Board";
import Notifications from "./toolbars/NotificationsToolbar";
import Refresh from "./toolbars/RefreshToolbar";

const SelectedPlayer = ({ player }: { player: any }) => {
  return <Player selected={player} />;
};

const Index: React.FunctionComponent<{
  texts: any;
  customerParties: any;
  bankParties: any;
  selected: string;
  selectParty: (v: any) => void;
  notifications?: boolean;
}> = ({
  texts,
  customerParties,
  bankParties,
  selected,
  selectParty,
  notifications,
}) => {
  const parties = useAppSelector(selectParties);
  const dispatch = useAppDispatch();
  return (
    <>
      <Box
        sx={{ paddingLeft: "75px", paddingRight: "75px", marginTop: "50px" }}
      >
        <Introduction texts={texts} />
      </Box>

      {notifications ? <Notifications /> : <Refresh />}
      <Box
        style={{
          display: "flex",
          height: "60vh",
          margin: "5px",
          border: "1px solid #BDBDBD",
          borderRadius: "5px",
        }}
      >
        <Box
          style={{
            overflowX: "hidden",
          }}
        >
          <Board
            customerParties={customerParties}
            bankParties={bankParties}
            selectParty={selectParty}
          />
        </Box>
        <Box sx={{ width: "40%", margin: "auto" }}>
          <SelectedPlayer player={parties[selected]} />
        </Box>
      </Box>
      <Button onClick={() => dispatch(createNewCustomer())}>
        Create Customer
      </Button>
    </>
  );
};

export default Index;
