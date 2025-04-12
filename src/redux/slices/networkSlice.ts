// src/redux/slices/networkSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from './expenseSlice';

type PendingOperation = {
  type: 'add' | 'edit' | 'delete';
  data: any;
};

interface NetworkState {
  isOnline: boolean;
  syncStatus: 'Idle' | 'Syncing...' | 'Synced';
  pendingOperations: PendingOperation[];
}

const initialState: NetworkState = {
  isOnline: navigator.onLine,
  syncStatus: 'Idle',
  pendingOperations: [],
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    addPendingOperation(state, action: PayloadAction<PendingOperation>) {
      state.pendingOperations.push(action.payload);
    },
    clearPendingOperations(state) {
      state.pendingOperations = [];
    },
    setSyncStatus(state, action: PayloadAction<NetworkState['syncStatus']>) {
      state.syncStatus = action.payload;
    },
  },
});

export const {
  setOnlineStatus,
  addPendingOperation,
  clearPendingOperations,
  setSyncStatus,
} = networkSlice.actions;

export default networkSlice.reducer;
