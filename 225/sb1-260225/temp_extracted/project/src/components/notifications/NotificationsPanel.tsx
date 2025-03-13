import React from 'react';
import { X } from 'lucide-react';

interface NotificationsPanelProps {
  onClose: () => void;
}

function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  return (
    <div className="absolute right-8 top-16 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        <div className="p-4 border-b hover:bg-gray-50">
          <div className="flex items-start">
            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">New intervention assigned</p>
              <p className="text-sm text-gray-500">Equipment maintenance required for MRI Scanner</p>
              <p className="mt-1 text-xs text-gray-400">2 minutes ago</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-b hover:bg-gray-50">
          <div className="flex items-start">
            <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Intervention completed</p>
              <p className="text-sm text-gray-500">X-Ray machine maintenance completed by John Doe</p>
              <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 text-center border-t">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Mark all as read
        </button>
      </div>
    </div>
  );
}

export default NotificationsPanel;