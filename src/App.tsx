import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"
import Medici from "./components/medici/steps/Stepper";
function App() {
  return (
    <ThemeProvider theme={theme}><Medici/></ThemeProvider>
  );
}

export default App;
