import { Box, Typography, Button } from "@mui/material";
import Operations from "./Operations"
import Balances from "./Balances";
import BasicInfo from "./BasicInfo"
import ActorTabs from "./ActorTabs"
import florenceFlag from "./florence-flag.png"
import lyonsFlag from "./lyons-flag.png"
const Actor: React.FunctionComponent<{ selected: any }> = ({ selected }) => {
  
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
        
        <ActorTabs selected={selected}/>
      </Box>
    </>
  );
};
export default Actor;
