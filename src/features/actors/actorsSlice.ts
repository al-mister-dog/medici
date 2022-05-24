//TODOS
/**
 * A LOT OF THE COMPLICATED OBJECT KEY STUFF COULD BE SIMPLIFIED BY ADDING GOODS
 * TO BANKER OBJECTS
 */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
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
}
interface Banker {
  id: string;
  city: string;
  type: string;
  assets: any;
  liabilities: any;
  coins: any;
  goods: number;
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
    },
    drawBill: (state, { payload }) => {
      function replaceBill(
        partyConcerned: Banker | Trader,
        category: keyof Category,
        bill: any
      ) {
        let partyConcernedId;
        let pCopy = { ...partyConcerned };
        if (partyConcerned.type === "banker") {
          partyConcernedId = payee.id as BankersObjectKey;
          pCopy[category] = pCopy[category].filter(
            (b: { id: any }) => b.id !== bill.id
          );
          pCopy[category] = [...pCopy[category], bill];
          state.bankers[partyConcernedId] = pCopy;
        } else {
          partyConcernedId = payee.id as TradersObjectKey;
          pCopy[category] = pCopy[category].filter(
            (b: { id: any }) => b.id !== bill.id
          );
          pCopy[category] = [...pCopy[category], bill];
          state.traders[partyConcernedId] = pCopy;
        }
      }

      function finaliseBill(holder: any, recipient: any, bill: any) {
        const recipientCopy = { ...bill };
        const holderCopy = { ...bill };
        recipientCopy.paid = true;
        holderCopy.paid = true;
        replaceBill(holder, "assets", holderCopy);
        replaceBill(recipient, "liabilities", recipientCopy);
      }

      function exchangeBill(
        holder: any,
        recipient: Banker | Trader,
        presentedBill: any
      ) {
        const bill = holder.assets.find(
          (b: { id: any }) => b.id === presentedBill.id
        );
        const recipientCopy = { ...bill };
        const holderCopy = { ...bill };
        holderCopy.paid = true;
        let rCopy = { ...recipient };
        rCopy.assets = [...rCopy.assets, recipientCopy];
        if (recipient.type === "banker") {
          const recipientId = recipient.id as BankersObjectKey;
          state.bankers[recipientId] = rCopy;
        } else {
          const recipientId = recipient.id as TradersObjectKey;
          state.traders[recipientId] = rCopy;
        }
        replaceBill(holder, "assets", holderCopy);
      }

      function exchangeMoney(payee: any, drawee: any, bill: any) {
        const unitOfAccount = bill.amount;
        const localCurrency = bill.amount * exchangeRates[bill.city];
        const cityQuotesCertain = certaintyQuotes[drawee.city];

        let pCopy = JSON.parse(JSON.stringify(payee))
        let dCopy = JSON.parse(JSON.stringify(drawee))
        
        if (cityQuotesCertain) {
          dCopy.coins[currencies[dCopy.city]] = dCopy.coins[currencies[dCopy.city]] - unitOfAccount;
          pCopy.coins[currencies[dCopy.city]] = pCopy.coins[currencies[dCopy.city]] + unitOfAccount;
        } else {
          dCopy.coins[currencies[dCopy.city]] = dCopy.coins[currencies[dCopy.city]] - localCurrency;
          pCopy.coins[currencies[dCopy.city]] = pCopy.coins[currencies[dCopy.city]] + localCurrency;
        }
        let payeeId;
        let draweeId;
        if (payee.type === "banker") {
          payeeId = payee.id as BankersObjectKey;
          draweeId = payee.id as TradersObjectKey;
          state.bankers[payeeId] = pCopy;
          state.traders[draweeId] = dCopy;
        } else {
          payeeId = payee.id as TradersObjectKey;
          draweeId = payee.id as BankersObjectKey;
          state.traders[payeeId] = pCopy;
          state.bankers[draweeId] = dCopy;
        }
      }

      const { payee, drawee, bill } = payload;
      drawee.id === bill.dueFrom
        ? finaliseBill(payee, drawee, bill)
        : exchangeBill(payee, drawee, bill);
      exchangeMoney(payee, drawee, bill);
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

export const { drawBill, trade, decrement, incrementByAmount } =
  actorsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state. .value)`
export const selectTraders = (state: RootState) => state.actors.traders;
export const selectBankers = (state: RootState) => state.actors.bankers;
export const selectState = (state: RootState) => state.actors;

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
