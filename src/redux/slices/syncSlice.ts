// src/redux/slices/syncSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SyncState {
  isOnline: boolean;  // Tracks if the app is online
  pendingOperations: any[];  // Holds the operations that need to be synced
  syncStatus: 'Offline' | 'Syncing...' | 'All changes synced' | 'Idle';  // Tracks sync status
}

const initialState: SyncState = {
  isOnline: navigator.onLine,  // Initialize based on browser's online status
  pendingOperations: [],  // Start with no pending operations
  syncStatus: 'Idle',  // Default sync status
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    // Update the online status (online or offline)
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    
    // Add an operation to the pending operations list
    addPendingOperation(state, action: PayloadAction<any>) {
      state.pendingOperations.push(action.payload);
    },

    // Sync all pending operations when online
    syncPendingOperations(state) {
      if (state.isOnline && state.pendingOperations.length > 0) {
        state.syncStatus = 'Syncing...';  // Set the sync status to syncing
        
        // Simulate a sync operation with a timeout
        setTimeout(() => {
          state.pendingOperations = [];  // Clear pending operations after sync
          state.syncStatus = 'All changes synced';  // Set status to indicate successful sync
        }, 2000); // Simulate 2 seconds of syncing
      } else {
        state.syncStatus = 'Offline';  // If offline, set the sync status to offline
      }
    },
  },
});

// Export the actions for dispatching
export const { setOnlineStatus, addPendingOperation, syncPendingOperations } = syncSlice.actions;

// Export the reducer for the store
export default syncSlice.reducer;
