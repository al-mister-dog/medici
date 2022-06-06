//TODOS
/**
 * A LOT OF THE COMPLICATED OBJECT KEY STUFF COULD BE SIMPLIFIED BY ADDING GOODS
 * TO BANKER OBJECTS
 */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import helpers from "./helpers";
// import { fetchCount } from "./ API";
import { Quotes, Rates, Currencies } from "../../types";
import {
  certaintyQuotes,
  exchangeRates,
  currencies,
  me,
  salviati,
  federigo,
  piero,
  you,
  tomasso,
} from "./initialState";

interface Trader {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
  records: any
}
interface Banker {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
  coinAsset: any;
  coinLiability: any;
  records: any
}
export interface ActorsState {
  conditions: {
    certaintyQuotes: Quotes;
    exchangeRates: Rates;
    currencies: Currencies;
  };
  traders: {
    me: Trader;
    salviati: Trader;
    federigo: Trader;
    piero: Trader;
  };
  bankers: {
    you: Banker;
    tomasso: Banker;
  };
  records: string[]
}
type Category = Pick<Banker | Trader, "assets" | "liabilities">;

const initialState: ActorsState = {
  conditions: {
    certaintyQuotes,
    exchangeRates,
    currencies,
  },
  traders: {
    me,
    salviati,
    federigo,
    piero,
  },
  bankers: {
    you,
    tomasso,
  },
  records: []
};
type TradersObjectKey = keyof typeof initialState.traders;
type BankersObjectKey = keyof typeof initialState.bankers;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   " /fetchCount",
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const actorsSlice = createSlice({
  name: "actors",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    trade: (state, { payload }) => {
      const { importer, exporter, amount } = payload;
      const importerId = importer.id as TradersObjectKey;
      const exporterId = exporter.id as TradersObjectKey;
      const bill = {
        id: new Date().toISOString(),
        dueTo: exporter.id,
        dueFrom: importer.id,
        city: importer.city,
        amount: amount,
        paid: false,
      };
      state.traders[importerId].goods += payload.amount;
      state.traders[exporterId].goods -= payload.amount;
      state.traders[importerId].liabilities = [
        ...payload.importer.liabilities,
        bill,
      ];
      state.traders[exporterId].assets = [...payload.exporter.assets, bill];

      const importRecord = `imported ${amount} ${amount > 1 ? "marcs": "marc"} worth of goods from ${exporterId}`
      const exportRecord = `exported ${amount} ${amount > 1 ? "marcs": "marc"} worth of goods to ${importerId}`
      state.traders[importerId].records = [...state.traders[importerId].records, importRecord]
      state.traders[exporterId].records = [...state.traders[exporterId].records, exportRecord]
      state.records = [...state.records, `${importerId} imports ${amount} ${amount > 1 ? "marcs": "marc"} worth of goods from ${exporterId}`]
    },
    drawBill: (state, { payload }) => {
      const { payee, drawee, bill } = payload;
      let payeeCopy = JSON.parse(JSON.stringify(payee));
      let draweeCopy = JSON.parse(JSON.stringify(drawee));

      drawee.id === bill.dueFrom
        ? helpers.finaliseBill(payeeCopy, draweeCopy, bill)
        : helpers.exchangeBill(payeeCopy, draweeCopy, bill);
      helpers.exchangeMoney(payeeCopy, draweeCopy, bill);
      let payeeId;
      let draweeId;
      if (payee.type === "banker") {
        payeeId = payee.id as BankersObjectKey;
        draweeId = drawee.id as TradersObjectKey;
        state.bankers[payeeId] = payeeCopy;
        state.traders[draweeId] = draweeCopy;
        state.bankers[payeeId].records = [...state.bankers[payeeId].records, `received ${bill.amount} from ${draweeId}`]
        state.traders[draweeId].records = [...state.traders[draweeId].records, `payed ${bill.amount} to ${payeeId}`]
        state.records = [...state.records, `${payeeId} draws bill on ${draweeId} for ${bill.amount}`]
      } else {
        payeeId = payee.id as TradersObjectKey;
        draweeId = drawee.id as BankersObjectKey;
        state.traders[payeeId] = payeeCopy;
        state.bankers[draweeId] = draweeCopy;
        state.traders[payeeId].records = [...state.traders[payeeId].records, `received ${bill.amount} from ${draweeId}`]
        state.bankers[draweeId].records = [...state.bankers[draweeId].records, `payed ${bill.amount} to ${payeeId}`]
        state.records = [...state.records, `${payeeId} draws bill on ${draweeId} for ${bill.amount} marc${bill.amount > 1 ? "s": ""}`]
      }
    },
    remitBill: (state, { payload }) => {
      const { presenter, presentee, bill } = payload;
      const presenterId = presenter.id as BankersObjectKey;
      const presenteeId = presentee.id as BankersObjectKey;
      let presenterCopy = JSON.parse(JSON.stringify(presenter));
      let presenteeCopy = JSON.parse(JSON.stringify(presentee));
      presenterCopy.assets = presenterCopy.assets.filter(
        (b: { id: any }) => b.id !== bill.id
      );
      presenteeCopy.assets = [...presenteeCopy.assets, bill];
      state.bankers[presenterId] = presenterCopy;
      state.bankers[presenteeId] = presenteeCopy;
      state.bankers[presenterId].records = [...state.bankers[presenterId].records, `presented remitance bill to ${presenteeId}`]
      state.bankers[presenteeId].records = [...state.bankers[presenteeId].records, `received remitance bill from ${presenterId}`]
      state.records = [...state.records, `${presenterId} remits bill to ${presenteeId}`] 
    },
    decrement: (state) => {
      // state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    // builder
    // .addCase(incrementAsync.pending, (state) => {
    //   // state.status = "loading";
    // })
    // .addCase(incrementAsync.fulfilled, (state, action) => {
    //   // state.status = "idle";
    //   // state.value += action.payload;
    // })
    // .addCase(incrementAsync.rejected, (state) => {
    //   // state.status = "failed";
    // });
  },
});

export const { trade, drawBill, remitBill, decrement, incrementByAmount } =
  actorsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state. .value)`
export const selectTraders = (state: RootState) => state.actors.traders;
export const selectBankers = (state: RootState) => state.actors.bankers;
export const selectState = (state: RootState) => state.actors;
export const selectRecords = (state: RootState) => state.actors.records;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default actorsSlice.reducer;
