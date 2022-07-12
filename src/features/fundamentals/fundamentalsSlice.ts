//TODOS: UPDATERESTOFSTATE FUNCTION
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { lookup } from "./program/lookupTables";
import { IBank } from "./program/types";
import { setupState } from "./initialState";
import { newSetupState, createBankingSystem } from "./helpers";
import { CustomerService } from "./program/services";
import { BankService } from "./program/services";

interface BankState {
  [index: string]: IBank;
}

const initialState: BankState = {
  ...setupState,
};

export const fundamentalsSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    deposit: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.deposit(lookup[p1.id], lookup[p2.id], amt);
      fundamentalsSlice.caseReducers.updateState(state);
    },
    withdraw: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.withdraw(lookup[p1.id], lookup[p2.id], amt);
      fundamentalsSlice.caseReducers.updateState(state);
    },
    transfer: (state, { payload }) => {
      const { p1, p2, amt } = payload;
      CustomerService.transfer(lookup[p1.id], lookup[p2.id], amt);
      fundamentalsSlice.caseReducers.updateState(state);
    },
    netDues: (state, { payload }) => {
      const { p1 } = payload;
      BankService.netDues(lookup[p1.id]);
      fundamentalsSlice.caseReducers.updateState(state);
    },
    updateState: (state) => {
      for (const key in state) {
        state[key] = JSON.parse(JSON.stringify(lookup[key]));
      }
    },
    reset: (state) => {
      for (const key in setupState) {
        state[key] = JSON.parse(JSON.stringify(setupState[key]));
        // lookup[key] = JSON.parse(JSON.stringify(setupState[key])); incase of errors
      }
    },
    setupModule: (state, { payload }) => {
      createBankingSystem(payload.setup);
      for (const key in newSetupState) {
        state[key] = JSON.parse(JSON.stringify(newSetupState[key]));
      }
    },
  },
});

export const {
  deposit,
  withdraw,
  transfer,
  netDues,
  reset,
  setupModule,
} = fundamentalsSlice.actions;

export const selectParties = (state: RootState) => state.partiesFundamentals;

export default fundamentalsSlice.reducer;
