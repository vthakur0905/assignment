import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteExpense, setEditingExpense } from '../redux/slices/expenseSlice';
import { addPendingOperation } from '../redux/slices/syncSlice';

const ExpenseList: React.FC = () => {
  const { expenses } = useAppSelector((state) => state.expenses);
  const { isOnline, syncStatus } = useAppSelector((state) => state.network);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (isOnline) {
      dispatch(deleteExpense(id));
    } else {
      dispatch(addPendingOperation({ type: 'delete', data: { id } }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-white mb-4">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-white">No expenses added yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((exp) => (
            <li
              key={exp.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{exp.title}</p>
                <p className="text-sm text-gray-600">
                  ₹{exp.amount} | {exp.category} |{' '}
                  {new Date(exp.date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => dispatch(setEditingExpense(exp))}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Display sync status */}
      <div className="mt-6 text-center text-white">
        {syncStatus === 'Syncing...' ? (
          <p>Syncing...</p>
        ) : isOnline ? (
          <p>Status: Online</p>
        ) : (
          <p>Status: Offline</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
