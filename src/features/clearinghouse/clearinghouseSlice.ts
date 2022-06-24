//LOOK INTO SIDE EFFECTS!!!
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { bankLookup, customerLookup } from "./program/lookupTables";
import {
  customer1,
  customer2,
  bank1,
  bank2,
  clearinghouse,
} from "./initialState";
import { CustomerService } from "./program/services";

const initialState = {
  customer1,
  customer2,
  bank1,
  bank2,
  clearinghouse,
};
type StateKey = keyof typeof initialState;
// type BankersObjectKey = keyof typeof initialState.bankers;

function copyPayload(payload: { p1: any; p2: any; amt: number }) {
  const { p1, p2, amt } = payload;
  const key1 = p1.id as StateKey;
  const key2 = p2.id as StateKey;
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

export const { deposit, transfer, reset } = clearinghouseSlice.actions;

export const selectParties = (state: RootState) => state.parties;

export default clearinghouseSlice.reducer;
