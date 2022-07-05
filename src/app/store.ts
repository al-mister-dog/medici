import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  playersReducer from '../features/players/playersSlice';
import clearinghouseReducer from '../features/clearinghouse/clearinghouseSlice'
import correspondentReducer from '../features/fundamentals/correspondentSlice'

export const store = configureStore({
  reducer: {
     players:  playersReducer,
     parties: clearinghouseReducer,
     cParties: correspondentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
