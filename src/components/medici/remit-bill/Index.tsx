import { useAppSelector } from "../../../app/hooks";
import {
  selectTraders,
  selectBankers,
} from "../../../features/players/playersSlice";
import Introduction from "../ui/Introduction";
import { Box } from "@mui/material";
import { useState } from "react";
import Player from "../modules/Player";
import BoardPlayers from "../modules/BoardPlayers";

const texts = {
  title: `Remitting Bills`,
  paragraphs: [
    `If a merchant ships goods abroad and wants a swift payment then a problem emerges. If they were to receive direct payment from the importer they would have to wait a long time to receive their payment, or even worse the payment could get lost in transport. Bills of exchange were a helpful tool for merchants in this case. The merchant could simply go to the exchange bank and redeem a bill with amount owed for a local or preferred currency. However the amount specified on the bill was not local currency but a special unit of account.`,
    `In Western Europe during the 16th century the unit of account in
    exchange banking was called the ecu de marc (gold marc). This unit
    would be used for all bills of exchange regardless of country, and was
    then redeemed in local or preferred currencies. The exchange rate of
    the marc would depend on what was announced at the international
    exchange fairs. The fair would take place in the dominant financial
    center of the time. At the time of this exchange, the financial center
    was Lyons (France). Lyons could dicate the price of the marc in any
    currency being used in the network which covered much of Western
    Europe. At the time of this exchange, one marc was worth 64 ecus,
    another coin which would have been an ideal choice for a merchant in
    Florence.`,
    `Here we have three people; Me, a merchant from Florence, You, an
    exchange banker in Florence, and Salviati, a merchant from Lyons. In
    Davanzati's example I (me) ship 1 Marcs worth of goods to Salviati and
    and then sell my Bill to You for 64 ecus.`,
  ],
  assignment: `Assignment: Get Me to ship 1 marcs worth of goods to Salviati and
  receive payment from You.`,
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
          <BoardPlayers selectPlayer={selectPlayer} />
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
          {(selected === "me" || !selected) && <SelectedPlayer player={me} />}
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
