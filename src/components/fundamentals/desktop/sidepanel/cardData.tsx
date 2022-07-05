import { Accordions } from "../../../types";
import DepositCard from "./operations-cards/DepositCard";
import NetDuesCard from "./operations-cards/NetDuesCard";
import OpenAccountCard from "./operations-cards/OpenAccountCard";
import SettleDuesCard from "./operations-cards/SettleDuesCard";
import TransferCard from "./operations-cards/TransferCard";
import WithdrawCard from "./operations-cards/WithdrawCard";

const cardData = (
  selected: any,
  accordionExpanded: Accordions,
  setAccordionExpanded: (accs: Accordions) => void
) => {
  return {
    deposit: (
      <DepositCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    transfer: (
      <TransferCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    withdraw: (
      <WithdrawCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    openAccount: (
      <OpenAccountCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    netDues: (
      <NetDuesCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
    settleDues: (
      <SettleDuesCard
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
      />
    ),
  };
};

export default cardData;
