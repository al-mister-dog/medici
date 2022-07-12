import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Home from "./Home"
import Fundamentals from "./components/fundamentals/steps/Stepper";
import Clearinghouse from "./components/fundamentals/steps/Stepper2";
import Medici from "./components/medici/steps/Stepper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overflow from "./Overflow";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/fundamentals" element={<Fundamentals />}/>
          <Route path="/clearinghouse" element={<Clearinghouse/>}/>
          <Route path="/medici" element={<Medici/>}/>
          
        </Routes>
      </Router>
      {/* <Overflow /> */}
    </ThemeProvider>
  );
}

export default App;
