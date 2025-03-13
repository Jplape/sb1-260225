import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X, Calendar, Clock, AlertTriangle, User, PenTool as Tool } from 'lucide-react';
import { addIntervention } from '../../state/interventionsSlice';
import { format } from 'date-fns';

interface NewInterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewInterventionModal({ isOpen, onClose }: NewInterventionModalProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    equipmentId: '',
    technicianId: '',
    priority: 'medium',
    description: '',
    scheduledDate: format(new Date(), 'yyyy-MM-dd'),
    scheduledTime: '09:00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const intervention = {
      id: crypto.randomUUID(),
      ...formData,
      scheduledDate: `${formData.scheduledDate}T${formData.scheduledTime}:00`,
      status: 'pending' as const,
    };
    dispatch(addIntervention(intervention));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Nouvelle Intervention</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Équipement
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tool className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={formData.equipmentId}
                  onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionner un équipement</option>
                  <option value="1">IRM Scanner</option>
                  <option value="2">Machine à rayons X</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Technicien
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={formData.technicianId}
                  onChange={(e) => setFormData({ ...formData, technicianId: e.target.value })}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionner un technicien</option>
                  <option value="1">Jean Dupont</option>
                  <option value="2">Marie Martin</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Heure
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priorité
            </label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="low"
                  checked={formData.priority === 'low'}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' })}
                  className="form-radio text-green-500"
                />
                <span className="ml-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Basse
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="medium"
                  checked={formData.priority === 'medium'}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'medium' })}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  Moyenne
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="high"
                  checked={formData.priority === 'high'}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' })}
                  className="form-radio text-red-500"
                />
                <span className="ml-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  Haute
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Décrivez l'intervention à réaliser..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Créer l'intervention
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewInterventionModal;