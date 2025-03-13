import React from 'react';
import { X, Bell, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface NotificationsPanelProps {
  onClose: () => void;
}

function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const handleMarkAllAsRead = () => {
    toast.success('Toutes les notifications ont été marquées comme lues');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-8 top-16 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 border-b hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-start">
            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Nouvelle intervention assignée</p>
              <p className="text-sm text-gray-500">Maintenance requise pour l'IRM Scanner</p>
              <p className="mt-1 text-xs text-gray-400">Il y a 2 minutes</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 border-b hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-start">
            <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Intervention terminée</p>
              <p className="text-sm text-gray-500">Maintenance de la machine à rayons X terminée par John Doe</p>
              <p className="mt-1 text-xs text-gray-400">Il y a 1 heure</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="p-4 text-center border-t">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMarkAllAsRead}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Tout marquer comme lu
        </motion.button>
      </div>
    </motion.div>
  );
}

export default NotificationsPanel;