import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"
import Medici from "./components/medici/steps/Stepper";
import Clearinghouse from "./components/clearinghouse/Index"
import ChStepper from "./components/clearinghouse/steps/Stepper"
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Medici/> */}
      {/* <Clearinghouse /> */}
      <ChStepper />
      </ThemeProvider>
  );
}

export default App;
