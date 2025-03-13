import api from './api';
import { format } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  technicianId?: string;
}

class CalendarService {
  async getEvents(start: Date, end: Date) {
    const response = await api.get<CalendarEvent[]>('/calendar/events', {
      params: {
        start: format(start, "yyyy-MM-dd'T'HH:mm:ss"),
        end: format(end, "yyyy-MM-dd'T'HH:mm:ss")
      }
    });
    return response.data;
  }

  async createEvent(event: Omit<CalendarEvent, 'id'>) {
    const response = await api.post<CalendarEvent>('/calendar/events', event);
    return response.data;
  }

  async updateEvent(id: string, event: Partial<CalendarEvent>) {
    const response = await api.put<CalendarEvent>(`/calendar/events/${id}`, event);
    return response.data;
  }

  async deleteEvent(id: string) {
    await api.delete(`/calendar/events/${id}`);
  }

  async syncGoogleCalendar() {
    const response = await api.post('/calendar/google/sync');
    return response.data;
  }
}

export default new CalendarService();