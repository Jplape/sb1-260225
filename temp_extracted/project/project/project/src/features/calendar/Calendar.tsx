import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { updateIntervention } from '../../state/interventionsSlice';
import { Calendar as CalendarIcon, Filter, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar';

interface CalendarViewProps {
  onAddIntervention: () => void;
}

function CalendarView({ onAddIntervention }: CalendarViewProps) {
  const dispatch = useDispatch();
  const interventions = useSelector((state: RootState) => state.interventions.items);
  const [view, setView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
  const { syncWithGoogle, isSyncing } = useGoogleCalendar();

  const events = interventions.map(intervention => ({
    id: intervention.id,
    title: `Intervention #${intervention.id.slice(0, 8)}`,
    start: intervention.scheduledDate,
    end: intervention.scheduledDate,
    backgroundColor: intervention.priority === 'high' ? '#EF4444' : 
                    intervention.priority === 'medium' ? '#F59E0B' : '#10B981',
    extendedProps: {
      description: intervention.description,
      technicianId: intervention.technicianId,
      status: intervention.status,
      priority: intervention.priority
    }
  }));

  const handleEventDrop = (info: any) => {
    const { event } = info;
    const intervention = interventions.find(i => i.id === event.id);
    
    if (intervention) {
      dispatch(updateIntervention({
        ...intervention,
        scheduledDate: format(event.start, "yyyy-MM-dd'T'HH:mm:ss")
      }));
    }
  };

  const handleViewChange = (newView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => {
    setView(newView);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Calendrier des Interventions</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewChange('dayGridMonth')}
              className={`px-3 py-1 rounded-lg ${
                view === 'dayGridMonth' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => handleViewChange('timeGridWeek')}
              className={`px-3 py-1 rounded-lg ${
                view === 'timeGridWeek' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => handleViewChange('timeGridDay')}
              className={`px-3 py-1 rounded-lg ${
                view === 'timeGridDay' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              Jour
            </button>
          </div>

          <button
            onClick={() => syncWithGoogle()}
            className={`px-4 py-2 rounded-lg border ${
              isSyncing ? 'bg-gray-100' : 'border-blue-500 text-blue-500 hover:bg-blue-50'
            }`}
            disabled={isSyncing}
          >
            {isSyncing ? 'Synchronisation...' : 'Sync Google Calendar'}
          </button>

          <button
            onClick={onAddIntervention}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Intervention</span>
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          locale="fr"
          editable={true}
          droppable={true}
          events={events}
          eventDrop={handleEventDrop}
          headerToolbar={false}
          height="auto"
          dayMaxEvents={true}
          weekends={true}
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          slotDuration="00:30:00"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
        />
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm">Priorité haute</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm">Priorité moyenne</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Priorité basse</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;