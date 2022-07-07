import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import {
  reservePercentage
} from "./initialState";

const initialState = {
  reservePercentage
};


export const correspondentSlice = createSlice({
  name: "auxilliary",
  initialState,
  reducers: {
    setReservePercentage: (state, {payload}) => {
      state.reservePercentage = payload.percentage
    }
  },
});

export const { setReservePercentage } = correspondentSlice.actions;

export const selectAuxilliary = (state: RootState) => state.auxilliary;

export default correspondentSlice.reducer;
