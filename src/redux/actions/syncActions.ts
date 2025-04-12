// src/redux/actions/syncActions.ts
import { AppThunk } from '../store';
// import { RootState } from '../store';
import { addExpense, editExpense, deleteExpense } from '../slices/expenseSlice';
import {
  clearPendingOperations,
  setSyncStatus,
} from '../slices/networkSlice';


export const syncPendingOperations = (): AppThunk => (dispatch, getState) => {
  const { pendingOperations } = getState().network;

  if (pendingOperations.length === 0) return;

  dispatch(setSyncStatus('Syncing...'));

  for (const op of pendingOperations) {
    switch (op.type) {
      case 'add':
        dispatch(addExpense(op.data));
        break;
      case 'edit':
        dispatch(editExpense(op.data));
        break;
      case 'delete':
        dispatch(deleteExpense(op.data));
        break;
    }
  }

  dispatch(clearPendingOperations());
  dispatch(setSyncStatus('Synced'));
};
