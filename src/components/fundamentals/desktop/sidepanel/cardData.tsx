import { Accordions } from "../../../types";
import MoveAmountMethod from "./operations-cards/MoveAmountMethod";
import NetDuesCard from "./operations-cards/NetDuesCard";
import OpenAccountCard from "./operations-cards/OpenAccountCard";
import SettleDuesCard from "./operations-cards/SettleDuesCard";

import {
  findBankByCustomersAccounts,
  findAllCustomers,
} from "./operations-cards/__filters";

const cardData = (
  selected: any,
  accordionExpanded: Accordions,
  setAccordionExpanded: (accs: Accordions) => void,
  config?: any,
) => {

  return {
    deposit: (
      <MoveAmountMethod
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findBankByCustomersAccounts}
        methodText="Deposit To"
        dispatchMethod="deposit"
        config={config}
      />
    ),
    transfer: (
      <MoveAmountMethod
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findAllCustomers}
        methodText="Transfer To"
        dispatchMethod="transfer"
        config={config}
      />
    ),
    withdraw: (
      <MoveAmountMethod
        selected={selected}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        filterMethod={findBankByCustomersAccounts}
        methodText="Withdraw From"
        dispatchMethod="withdraw"
        config={config}

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
