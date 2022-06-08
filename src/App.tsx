import "./App.css"
import { Box, AppBar, Toolbar } from "@mui/material";
import Stepper from "./components/medici/Stepper";
function App() {
  return (
    
      <Box sx={{ height: "200vh", backgroundColor: "#607D8B", position: "absolute" }}>
        <Stepper />
      </Box>
    
  );
}

export default App;
