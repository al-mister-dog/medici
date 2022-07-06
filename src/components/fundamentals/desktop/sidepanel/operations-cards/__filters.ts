import { IBank } from "../../../../../program/clearinghouse/types";

export const findBankByCustomersAccounts = (
  selected: IBank,
  partiesArray: IBank[]
) => {
  return partiesArray.filter((party: IBank) =>
    selected.assets.customerDeposits.find((acc: any) => acc.id === party.id)
  );
};

export const findAllCustomers = (selected: IBank, partiesArray: IBank[]) => {
  return partiesArray.filter(
    (party: IBank) => party.id.includes("customer") && selected.id !== party.id
  );
};
