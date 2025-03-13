import { useState } from 'react';
import api from '../services/api';

export function useGoogleCalendar() {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncWithGoogle = async () => {
    try {
      setIsSyncing(true);
      await api.post('/calendar/sync');
    } catch (error) {
      console.error('Failed to sync with Google Calendar:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    syncWithGoogle,
    isSyncing
  };
}