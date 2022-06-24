import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  playersReducer from '../features/players/playersSlice';
import clearinghouseReducer from '../features/clearinghouse/clearinghouseSlice'

export const store = configureStore({
  reducer: {
     players:  playersReducer,
     parties: clearinghouseReducer
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
