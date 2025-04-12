import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const Dashboard: React.FC<{ expired: boolean }> = ({ expired }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center text-white mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
            {expired && (
              <p className="text-red-400 font-semibold mt-2">
                ⚠ Session expired. Please login again.
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
};

export default Dashboard;
