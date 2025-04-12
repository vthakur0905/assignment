
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import expenseReducer from './slices/expenseSlice';
import networkReducer from './slices/networkSlice';
import { ThunkAction, Action } from '@reduxjs/toolkit';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    network: networkReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;




