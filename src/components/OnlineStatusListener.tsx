// src/components/OnlineStatusListener.tsx
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setOnlineStatus } from '../redux/slices/networkSlice';
import { syncPendingOperations } from '../redux/actions/syncActions';

const OnlineStatusListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateStatus = () => {
      const online = navigator.onLine;
      dispatch(setOnlineStatus(online));
      if (online) {
        dispatch(syncPendingOperations());
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    updateStatus();

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, [dispatch]);

  return null;
};

export default OnlineStatusListener;
