import api from './api';
import websocketService from './websocketService';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

class NotificationService {
  private listeners: ((notification: Notification) => void)[] = [];

  constructor() {
    websocketService.subscribe('notification', (notification: Notification) => {
      this.notifyListeners(notification);
    });
  }

  async getNotifications() {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
  }

  async markAsRead(notificationId: string) {
    await api.put(`/notifications/${notificationId}/read`);
  }

  async markAllAsRead() {
    await api.put('/notifications/read-all');
  }

  addListener(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: (notification: Notification) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(notification: Notification) {
    this.listeners.forEach(listener => listener(notification));
  }
}

export default new NotificationService();