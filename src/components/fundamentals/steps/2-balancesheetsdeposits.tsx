import { useAppSelector } from "../../../app/hooks";
import { selectParties } from "../../../features/fundamentals/fundamentalsSlice";
import { useState, useEffect } from "react";
import IndexMobile from "../mobile/Index";
import IndexDesktop from "../desktop/Index";
import { texts1 } from "../assets/texts";
import { modules } from "../config";
import { IBank } from "../../../features/clearinghouse/program/types";

const config = modules.fundamentals.steps.step1

function App() {
  const parties = useAppSelector(selectParties);

  const [selected, setSelected] = useState<string>("customer1");

  let partiesArray: IBank[] = [];

  for (const key in parties) {
    partiesArray = [...partiesArray, parties[key]];
  }

  const customerParties = partiesArray.filter((party) =>
    party.id.includes("customer") && party.id.includes("1")
  );

  const bankParties = partiesArray.filter(
    (party) => party.id.includes("bank") && party.id.includes("1")
  );

  function selectParty(player: any) {
    setSelected(player.id);
  }

  const [width, setWidth] = useState(window.innerWidth);

  const breakpoint = 700;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  
  if (width > breakpoint) {
    return (
      <IndexDesktop
        config={config}
        texts={texts1}
        customerParties={customerParties}
        bankParties={bankParties}
        selected={selected}
        selectParty={selectParty} 
      />
    );
  }
  return (
    <></>
    // <IndexMobile
    //   texts={texts1}
    //   customerParties={customerParties}
    //   bankParties={bankParties}
    //   selected={selected}
    //   selectPlayer={selectPlayer}
    // />
  );
}

export default App;
