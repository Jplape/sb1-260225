import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Clock, AlertTriangle, CheckCircle, List, Calendar as CalendarIcon } from 'lucide-react';
import CalendarView from '../calendar/Calendar';
import NewInterventionModal from './NewInterventionModal';

function Interventions() {
  const interventions = useSelector((state: RootState) => state.interventions.items);
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddIntervention = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Interventions</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                view === 'calendar' ? 'bg-white shadow' : ''
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Calendrier</span>
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                view === 'list' ? 'bg-white shadow' : ''
              }`}
            >
              <List className="w-4 h-4" />
              <span>Liste</span>
            </button>
          </div>
        </div>
      </div>

      {view === 'calendar' ? (
        <CalendarView onAddIntervention={handleAddIntervention} />
      ) : (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="space-y-4">
              {interventions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune intervention trouvée</p>
              ) : (
                interventions.map((intervention) => (
                  <div key={intervention.id} className="flex items-center p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {intervention.status === 'pending' && <Clock className="w-5 h-5 text-blue-500" />}
                        {intervention.status === 'in-progress' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                        {intervention.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        <span className="font-medium">Intervention #{intervention.id.slice(0, 8)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{intervention.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        intervention.priority === 'high' ? 'bg-red-100 text-red-800' :
                        intervention.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {intervention.priority}
                      </span>
                      <span className="text-sm text-gray-500">{intervention.scheduledDate}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <NewInterventionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Interventions;