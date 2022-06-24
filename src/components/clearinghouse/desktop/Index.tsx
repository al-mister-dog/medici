import { useAppSelector } from "../../../app/hooks";
import {
  selectParties
} from "../../../features/clearinghouse/clearinghouseSlice";
import Introduction from "../ui/Introduction";
import { Box } from "@mui/material";
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
  const { customer1, customer2, bank1, bank2, clearinghouse } = useAppSelector(selectParties);
  

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
          {selected === "customer1" && <SelectedPlayer player={customer1} />}
          {selected === "customer2" && <SelectedPlayer player={customer2} />}
          {selected === "bank1" && <SelectedPlayer player={bank1} />}
          {selected === "bank2" && <SelectedPlayer player={bank2} />}
          {selected === "clearinghouse" && <SelectedPlayer player={clearinghouse} />}
        </Box>
      </Box>
    </>
  );
};

export default Index;
