import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";

import { Box, } from "@mui/material";
import { useState } from "react";
import Player from "./Player";
// import Notifications from "./Toolbar"
import BoardPlayers from "./BoardPlayers";

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

  function selectPlayer(player: any) {
    setSelected(player.id);
  }
  
  return (
    <Box style={{ background: "#F3F6F9" }}>
      
      <div style={{ background: "white", paddingLeft: "75px", paddingRight: "75px", overflowX: "hidden" }}>
      <h3 style={{letterSpacing: "1px", textAlign: "justify"}}>Bills of Exchange and Units of Account</h3>
        <p style={{letterSpacing: "1px", textAlign: "justify"}}>
          If a merchant ships goods abroad and wants a swift payment then a
          problem emerges. If they were to receive direct payment from the
          importer they would have to wait a long time to receive their payment,
          or even worse the payment could get lost in transport. Bills of
          exchange were a helpful tool for merchants in this case. The merchant
          could simply go to the exchange bank and redeem a bill with amount
          owed for a local or preferred currency. However the amount specified
          on the bill was not local currency but a special unit of account.
        </p>
        <p style={{letterSpacing: "1px", textAlign: "justify"}}>
          In Western Europe during the 16th century the unit of account in
          exchange banking was called the ecu de marc (gold marc). This unit
          would be used for all bills of exchange regardless of country, and was
          then redeemed in local or preferred currencies. The exchange rate of
          the marc would depend on what was announced at the international
          exchange fairs. The fair would take place in the dominant financial
          center of the time. At the time of this exchange, the financial center
          was Lyons (France). Lyons could dicate the price of the marc in any
          currency being used in the network which covered much of Western
          Europe.
          At the time of this exchange, one marc was worth 64 ecus, another coin
          which would have been an ideal choice for a merchant in Florence.
        </p>
        <p style={{letterSpacing: "1px", textAlign: "justify"}}>
          Here we have three people; Me, a merchant from Florence, You, an
          exchange banker in Florence, and Salviati, a merchant from Lyons. In
          Davanzati's example I (me) ship 1 Marcs worth of goods to Salviati and
          and then sell my Bill to You for 64 ecus.
        </p>
        <p style={{letterSpacing: "1px", textAlign: "justify"}}>
          Assignment: Get Me to ship 1 marcs worth of goods to Salviati and
          receive payment from You.
        </p>
      </div>
      <Box style={{ display: "flex", height: "60vh"}}>
        <Box style={{ width: "60%" }}>
          <BoardPlayers selectPlayer={selectPlayer} />
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "60vh",
            background: "white",
            overflowX: "hidden"
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
    </Box>
  );
}

export default App;
