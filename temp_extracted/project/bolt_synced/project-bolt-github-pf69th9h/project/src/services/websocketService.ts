import { io, Socket } from 'socket.io-client';

interface WebSocketMessage {
  type: 'chat' | 'notification' | 'intervention_update';
  payload: any;
}

class WebSocketService {
  private socket: Socket | null = null;
  private messageHandlers: Map<string, (payload: any) => void> = new Map();

  connect() {
    this.socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
      auth: {
        token: localStorage.getItem('auth_token')
      }
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('message', (message: WebSocketMessage) => {
      const handler = this.messageHandlers.get(message.type);
      if (handler) {
        handler(message.payload);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  subscribe(type: string, handler: (payload: any) => void) {
    this.messageHandlers.set(type, handler);
  }

  unsubscribe(type: string) {
    this.messageHandlers.delete(type);
  }

  send(type: string, payload: any) {
    if (this.socket) {
      this.socket.emit('message', { type, payload });
    }
  }
}

export default new WebSocketService();