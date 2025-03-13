import { configureStore } from '@reduxjs/toolkit';
import interventionsReducer from './interventionsSlice';
import equipmentReducer from './equipmentSlice';
import reportsReducer from './reportsSlice';
import notificationsReducer from './notificationsSlice';
import chatbotReducer from './chatbotSlice';

export const store = configureStore({
  reducer: {
    interventions: interventionsReducer,
    equipment: equipmentReducer,
    reports: reportsReducer,
    notifications: notificationsReducer,
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;