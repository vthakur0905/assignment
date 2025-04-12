import React, { useEffect, useState } from 'react';
import {
  Expense,
  addExpense,
  editExpense,
  setEditingExpense,
} from '../redux/slices/expenseSlice';
import {
  addPendingOperation,
  syncPendingOperations,
} from '../redux/slices/syncSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { v4 as uuidv4 } from 'uuid';

const ExpenseForm: React.FC = () => {
  const dispatch = useDispatch();
  const { editingExpense } = useSelector((state: RootState) => state.expenses);
  const { isOnline, syncStatus } = useSelector((state: RootState) => state.network);

  const [form, setForm] = useState<Omit<Expense, 'id'>>({
    title: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    if (editingExpense) {
      const { id, ...rest } = editingExpense;
      setForm(rest);
    }
  }, [editingExpense]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingExpense) {
      const updatedExpense = { id: editingExpense.id, ...form };

      if (isOnline) {
        dispatch(editExpense(updatedExpense));
      } else {
        dispatch(
          addPendingOperation({ type: 'edit', data: updatedExpense })
        );
      }

      dispatch(setEditingExpense(null));
    } else {
      const newExpense = { id: uuidv4(), ...form };

      if (isOnline) {
        dispatch(addExpense(newExpense));
      } else {
        dispatch(addPendingOperation({ type: 'add', data: newExpense }));
      }
    }

    setForm({
      title: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().substring(0, 10),
    });
  };

  const handleSync = () => {
    console.log('Sync button clicked');
    dispatch(syncPendingOperations());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold text-gray-700">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>

        {editingExpense && (
          <button
            type="button"
            onClick={() => dispatch(setEditingExpense(null))}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-full"
          >
            Cancel
          </button>
        )}
      </div>

      {!isOnline && syncStatus !== 'Syncing...' && (
        <div>
          <button
            type="button"
            onClick={handleSync}
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
          >
            Sync Offline Changes
          </button>
        </div>
      )}

      {syncStatus === 'Syncing...' && (
        <div className="text-center mt-4">Syncing your changes...</div>
      )}
    </form>
  );
};

export default ExpenseForm;
