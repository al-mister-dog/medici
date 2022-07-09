//LOOK INTO SIDE EFFECTS!!!
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { bankLookup, customerLookup } from "./program/lookupTables";
import { IBank } from "./program/types";
import {
  customer1,
  customer2,
  bank1,
  bank2,
  clearinghouse,
} from "./initialState";
import { ClearingHouseService, CustomerService } from "./program/services";
import { customerAssets, customerBalances, customerLiabilities } from "./program/fixtures";
import { BankService } from "./program/services";

interface BankState {
  [index:string]: IBank
}

const initialState: BankState = {
  customer1,
  customer2,
  bank1,
  bank2,
  clearinghouse,
};

type BankStateKey = keyof typeof initialState;

let customerCount = 3
let bankCount = 3

function createCustomer() {
  const newCustomer: IBank = {
    id: `customer${customerCount}`,
    type: "customer",
    assets: { ...customerAssets },
    liabilities: { ...customerLiabilities },
    balances: { ...customerBalances },
    reserves: 0,
    records: [],
  };
  customerCount = customerCount + 1
  customerLookup[newCustomer.id] = JSON.parse(JSON.stringify(newCustomer));
  return newCustomer
}

function copyPayload(payload: { p1: any; p2: any; amt: number }) {
  const { p1, p2, amt } = payload;
  const key1 = p1.id as BankStateKey;
  const key2 = p2.id as BankStateKey;
  const copy1 = JSON.parse(JSON.stringify(p1));
  const copy2 = JSON.parse(JSON.stringify(p2));
  return { copy1, copy2, key1, key2, amt };
}

export const clearinghouseSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    deposit: (state, { payload }) => {
      const { copy1, copy2, key1, key2, amt } = copyPayload(payload);
      CustomerService.deposit(copy1, copy2, amt);
      state[key1] = copy1;
      state[key2] = copy2;
      clearinghouseSlice.caseReducers.updateLookupState(state);
    },
    withdraw: (state, {payload}) => {
      const { copy1, copy2, key1, key2, amt } = copyPayload(payload);
      CustomerService.withdraw(copy1, copy2, amt);
      state[key1] = copy1;
      state[key2] = copy2;
      clearinghouseSlice.caseReducers.updateLookupState(state);
    },
    transfer: (state, { payload }) => {
      const { copy1, copy2, key1, key2, amt } = copyPayload(payload);
      CustomerService.transfer(copy1, copy2, amt);
      state[key1] = copy1;
      state[key2] = copy2;
      state.bank1 = bankLookup[bank1.id];
      state.bank2 = bankLookup[bank2.id];
      state.clearinghouse = bankLookup[clearinghouse.id];
      clearinghouseSlice.caseReducers.updateLookupState(state);
    },
    netDues:(state, {payload}) => {
      const {p1} = payload;
      const key = p1.id as BankStateKey;
      const p1Copy = JSON.parse(JSON.stringify(p1))
      BankService.netDues(p1Copy);
      state[key] = p1Copy
    },
    settleDues:(state) => {
      ClearingHouseService.settleDues()
      // bankLookup[bank1.id] = JSON.parse(JSON.stringify(state.bank1));
      // bankLookup[bank2.id] = JSON.parse(JSON.stringify(state.bank2));
      // customerLookup[customer1.id] = JSON.parse(
      //   JSON.stringify(state.customer1)
      // );
      // customerLookup[customer2.id] = JSON.parse(
      //   JSON.stringify(state.customer2)
      // );
      // bankLookup[clearinghouse.id] = JSON.parse(
      //   JSON.stringify(state.clearinghouse)
      // );

      state.customer1 = customerLookup[state.customer1.id];
      state.customer2 = customerLookup[state.customer2.id];
      state.bank1 = bankLookup[state.bank1.id];
      state.bank2 = bankLookup[state.bank2.id];
      state.clearinghouse = bankLookup[state.clearinghouse.id]
    },
    createNewCustomer: (state) => {
      const newCustomer = createCustomer()
      state[newCustomer.id] = newCustomer
    },
    reset: (state) => {
      state.customer1 = customer1;
      state.customer2 = customer2;
      state.bank1 = bank1;
      state.bank2 = bank2;
      state.clearinghouse = clearinghouse;
    },
    updateLookupState: (state) => {
      bankLookup[bank1.id] = JSON.parse(JSON.stringify(state.bank1));
      bankLookup[bank2.id] = JSON.parse(JSON.stringify(state.bank2));
      customerLookup[customer1.id] = JSON.parse(
        JSON.stringify(state.customer1)
      );
      customerLookup[customer2.id] = JSON.parse(
        JSON.stringify(state.customer2)
      );
      bankLookup[clearinghouse.id] = JSON.parse(
        JSON.stringify(state.clearinghouse)
      );
    },
  },
});

export const { deposit, withdraw, transfer, netDues, settleDues, createNewCustomer, reset } = clearinghouseSlice.actions;

export const selectParties = (state: RootState) => state.partiesClearinghouse;

export default clearinghouseSlice.reducer;
