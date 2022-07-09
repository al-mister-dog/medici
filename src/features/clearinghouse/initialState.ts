import { IBank } from "./program/types";
import {
  commercialAssets,
  commercialLiabilities,
  commercialBalances,
  customerAssets,
  customerLiabilities,
  customerBalances,
  clearinghouseAssets,
  clearinghouseLiabilities,
  clearinghouseBalances,
} from "./program/fixtures";
import { bankLookup, customerLookup } from "./program/lookupTables";
import {
  ClearingHouseService,
  CustomerService,
  BankService,
} from "./program/services";
import { System } from "./program/systemMethods";

const bank1: IBank = {
  id: "bank1",
  type: "bank",
  assets: { ...commercialAssets },
  liabilities: { ...commercialLiabilities },
  balances: { ...commercialBalances },
  reserves: 0,
  records: [],
};

bankLookup[bank1.id] = JSON.parse(JSON.stringify(bank1));

const bank2: IBank = {
  id: "bank2",
  type: "bank",
  assets: { ...commercialAssets },
  liabilities: { ...commercialLiabilities },
  balances: { ...commercialBalances },
  reserves: 100,
  records: [],
};


const customer1: IBank = {
  id: "customer1",
  type: "customer",
  assets: { ...customerAssets },
  liabilities: { ...customerLiabilities },
  balances: { ...customerBalances },
  reserves: 100,
  records: [],
};


const customer2: IBank = {
  id: "customer2",
  type: "customer",
  assets: { ...customerAssets },
  liabilities: { ...customerLiabilities },
  balances: { ...customerBalances },
  reserves: 0,
  records: [],
};


const clearinghouse: IBank = {
  id: "clearinghouse",
  type: "clearinghouse",
  assets: { ...clearinghouseAssets },
  liabilities: { ...clearinghouseLiabilities },
  balances: { ...clearinghouseBalances },
  reserves: 0,
  records: [],
};

function clearinghousePlusCertificates() {
  System.setSystem("clearinghouse");
  ClearingHouseService.openAccount(bank1, clearinghouse, 1000);
  ClearingHouseService.openAccount(bank2, clearinghouse, 1000);
}

clearinghousePlusCertificates();
CustomerService.openAccount(customer1, bank1);
CustomerService.openAccount(customer2, bank2);
BankService.openAccount(bank1, bank2);
BankService.openAccount(bank2, bank1);

bankLookup[bank1.id] = JSON.parse(JSON.stringify(bank1));
bankLookup[bank2.id] = JSON.parse(JSON.stringify(bank2));
customerLookup[customer1.id] = JSON.parse(JSON.stringify(customer1));
customerLookup[customer2.id] = JSON.parse(JSON.stringify(customer2));
bankLookup[clearinghouse.id] = JSON.parse(JSON.stringify(clearinghouse))


export { bank1, bank2, customer1, customer2, clearinghouse };
