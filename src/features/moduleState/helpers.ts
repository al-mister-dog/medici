
import { commercialAssets, commercialBalances, commercialLiabilities, customerAssets, customerBalances, customerLiabilities } from "./program/fixtures";
import { lookup } from "./program/lookupTables";
import { CustomerService } from "./program/services";
import { System } from "./program/systemMethods";
import { IBank } from "./program/types";

type BankConfig = {
  bank: string;
  customers: CustomerConfig[];
  reserves: number;
};
type CustomerConfig = {
  customer: string;
  reserves: number;
  initialDeposit: number;
  transfers: TransferConfig[];
};
type TransferConfig = { customer: string; amount: number };

function createCustomer(id: string, reserves = 0) {
  const newCustomer: IBank = {
    id,
    type: "customer",
    assets: { ...customerAssets },
    liabilities: { ...customerLiabilities },
    balances: { ...customerBalances },
    reserves,
    records: [],
  };
  lookup[newCustomer.id] = JSON.parse(JSON.stringify(newCustomer));
  return newCustomer;
}

function createBank(id: string, reserves = 0) {
  const newBank: IBank = {
    id,
    type: "bank",
    assets: { ...commercialAssets },
    liabilities: { ...commercialLiabilities },
    balances: { ...commercialBalances },
    reserves,
    records: [],
  };
  lookup[newBank.id] = JSON.parse(JSON.stringify(newBank));
  return newBank;
}

interface StateObject {
  [index: string]: IBank;
}

export const newSetupState: StateObject = {};

export function createBankingSystem(config: { system: any; parties: any }) {
  System.setSystem(config.system);
  config.parties.forEach((bank: BankConfig) => {
    const newBank = createBank(bank.bank, bank.reserves);
    lookup[newBank.id] = newBank;
    newSetupState[newBank.id] = newBank;
    bank.customers?.forEach((customer) => {
      const newCustomer = createCustomer(customer.customer, customer.reserves);
      lookup[newCustomer.id] = newCustomer;
      newSetupState[newCustomer.id] = newCustomer;
      CustomerService.openAccount(newCustomer, newBank);
      customer.initialDeposit &&
        CustomerService.deposit(newCustomer, newBank, customer.initialDeposit);
    });
  });
  config.parties.forEach((bank: BankConfig) => {
    bank.customers.forEach((customer) => {
      customer.transfers?.forEach((transfer) => {
        const thisCustomer = lookup[customer.customer];
        const payee = lookup[transfer.customer];
        const amount = transfer.amount;
        CustomerService.transfer(thisCustomer, payee, amount);
      });
    });
  });
}

