import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
  editingExpense: Expense | null;
}

const initialState: ExpenseState = {
  expenses: JSON.parse(localStorage.getItem('expenses') || '[]'),
  editingExpense: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    editExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses = state.expenses.map((exp) =>
        exp.id === action.payload.id ? action.payload : exp
      );
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((exp) => exp.id !== action.payload);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    setEditingExpense: (state, action: PayloadAction<Expense | null>) => {
      state.editingExpense = action.payload;
    },
  },
});

export const {
  addExpense,
  editExpense,
  deleteExpense,
  setEditingExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
