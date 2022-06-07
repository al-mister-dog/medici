import { Box, Typography } from "@mui/material";

import PlayerTabs from "./PlayerTabs"
import florenceFlag from "../assets/florence-flag.png"
import lyonsFlag from "../assets/lyons-flag.png"
const Player: React.FunctionComponent<{ selected: any }> = ({ selected }) => {
  
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "25px"}}>
        <Typography variant="h6" align="left" sx={{marginTop: 4}}>
          {capitalize(selected.id)}: {capitalize(selected.type)}, {capitalize(selected.city)}
        </Typography>
        <img src={selected.city === "florence" ? florenceFlag : lyonsFlag} alt="asas" style={{width: "150px"}}></img>
        </div>
        
        <PlayerTabs selected={selected}/>
      </Box>
    </>
  );
};
export default Player;
