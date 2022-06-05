import { Box, Typography, Button } from "@mui/material";
import Operations from "./Operations"
import Balances from "./Balances";
import BasicInfo from "./BasicInfo"
import ActorTabs from "./ActorTabs"
const Actor: React.FunctionComponent<{ selected: any }> = ({ selected }) => {
  
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" align="left" sx={{marginTop: 4}}>
          {capitalize(selected.id)}: {capitalize(selected.type)}, {capitalize(selected.city)}
        </Typography>
        <ActorTabs selected={selected}/>
      </Box>
    </>
  );
};
export default Actor;
