import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from './redux/slices/authSlice';
import { RootState } from './redux/store';
import { setOnlineStatus, syncPendingOperations } from './redux/slices/syncSlice';
import OnlineStatusListener from './components/OnlineStatusListener'; // Import the OnlineStatusListener component

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, expired } = useSelector((state: RootState) => state.auth);

  // Handle session check and auto refresh every minute
  useEffect(() => {
    dispatch(checkSession());
    const interval = setInterval(() => {
      dispatch(checkSession());
    }, 60000); // check session every 1 minute
    return () => clearInterval(interval);
  }, [dispatch]);

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      dispatch(setOnlineStatus(true));
      dispatch(syncPendingOperations());  // Sync pending operations when the app goes online
    };

    const handleOffline = () => {
      dispatch(setOnlineStatus(false));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up the event listeners when the component is unmounted
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  return (
    <Router>
      <OnlineStatusListener />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard expired={expired} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
