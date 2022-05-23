import { useAppSelector, useAppDispatch } from './app/hooks';
import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
  selectState,
} from './features/counter/counterSlice';
import { Box } from "@mui/material";
import { useState } from "react";
import "./App.css";
import AllActors from "./components/medici/AllActors";
import Actor from "./components/ui/Actor";
import DataGrid from "./components/ui/DataGrid";

interface Bill {
  id: string;
  dueTo: string;
  dueFrom: string;
  city: string;
  amount: number;
  status: boolean;
}
function App() {
  
const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(null);
  const [bills, setBills] = useState<Bill[]>([]);

  function selectActor(actor: any) {
    setSelected(actor);
  }
  function addToBills(bill: any) {
    setBills([...bills, bill]);
  }
  return (
    <Box className="App" style={{background: "#F3F6F9", height: "100vh"}}>
      <Box style={{ display: "flex" }}>
        <Box style={{ width: "60%" }}>
          <AllActors selectActor={selectActor} addToBills={addToBills} />
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flexStart",
            background: "white"
          }}
        >
          {bills.length > 0 && (
            <Box style={{ width: "95%", margin: "auto" }}>
              <DataGrid bills={bills}/>
            </Box>
          )}

          {selected !== null && (
            <Box style={{ width: "95%", margin: "auto" }}>
              <Actor selected={selected}/>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;


