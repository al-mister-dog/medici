import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"
import Medici from "./components/medici/steps/Stepper";
import Clearinghouse from "./components/clearinghouse/steps/Stepper"
import Fundamentals from "./components/fundamentals/steps/Stepper"
import { useState } from "react";
function App() {
  const [module, setModule] = useState(0)
  return (
    <ThemeProvider theme={theme}>
      <div>
      <button onClick={() => setModule(0)}>Fundamentals</button>
        <button onClick={() => setModule(1)}>Clearinghouse</button>
        <button onClick={() => setModule(2)}>Medici</button>
      </div>
      {module === 2 &&
      <Medici/>
      }
      {module === 1 &&
      <Clearinghouse />
      }
      {module === 0 &&
      <Fundamentals />
      }
      
      </ThemeProvider>
  );
}

export default App;
