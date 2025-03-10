import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { BarChart3, Activity, AlertCircle, Calendar, Users, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Dashboard() {
  const interventions = useSelector((state: RootState) => state.interventions.items);
  
  const stats = {
    pending: interventions.filter(i => i.status === 'pending').length,
    inProgress: interventions.filter(i => i.status === 'in-progress').length,
    completed: interventions.filter(i => i.status === 'completed').length,
  };

  const calendarEvents = interventions.map(intervention => ({
    id: intervention.id,
    title: `Intervention #${intervention.id.slice(0, 8)}`,
    start: intervention.scheduledDate,
    backgroundColor: intervention.priority === 'high' ? '#EF4444' : 
                    intervention.priority === 'medium' ? '#F59E0B' : '#10B981',
    className: 'text-xs p-1'
  }));

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interventions en attente</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <Activity className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Équipements critiques</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendrier des Interventions</h2>
            <div className="calendar-container" style={{ height: '400px' }}>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridWeek"
                headerToolbar={{
                  left: '',
                  center: 'title',
                  right: ''
                }}
                events={calendarEvents}
                height="100%"
                dayMaxEvents={3}
                eventDisplay="block"
                displayEventTime={false}
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
        </div>

        {/* Active Technicians */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Techniciens Actifs</h2>
            <div className="space-y-4">
              {[
                { id: 1, name: 'Jean Dupont', status: 'active', currentTask: 'Maintenance IRM' },
                { id: 2, name: 'Marie Martin', status: 'busy', currentTask: 'Réparation Scanner' },
                { id: 3, name: 'Pierre Durand', status: 'inactive', currentTask: 'En pause' }
              ].map((tech) => (
                <div key={tech.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                    <p className="text-sm text-gray-500">{tech.currentTask}</p>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    tech.status === 'active' ? 'bg-green-100 text-green-800' :
                    tech.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {tech.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages Récents</h2>
          <div className="space-y-4">
            {[
              { id: 1, sender: 'Jean Dupont', message: 'Maintenance IRM terminée', time: '10:30' },
              { id: 2, sender: 'Marie Martin', message: 'Besoin d\'assistance technique', time: '09:45' }
            ].map((message) => (
              <div key={message.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                  <p className="text-sm text-gray-500">{message.message}</p>
                </div>
                <span className="text-xs text-gray-400">{message.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;