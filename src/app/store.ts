import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  actorsReducer from '../features/actors/actorsSlice';

export const store = configureStore({
  reducer: {
     actors:  actorsReducer,
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
