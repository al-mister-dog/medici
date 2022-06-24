import { useAppSelector } from "../../../app/hooks";
import {
  selectParties
} from "../../../features/clearinghouse/clearinghouseSlice";
import { useState, useEffect } from "react";
import IndexMobile from "../mobile/Index";
import IndexDesktop from "../desktop/Index";
import { texts1 } from "../assets/texts";

function App() {
  const { customer1, customer2, bank1, bank2, clearinghouse } = useAppSelector(selectParties);
  const [selected, setSelected] = useState<string>("customer1");
  const customerParties = [customer1, customer2];
  const bankParties = [bank1, bank2, clearinghouse];
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
