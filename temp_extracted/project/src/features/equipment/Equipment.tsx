import React from 'react';
import { PenTool as Tool, AlertCircle, CheckCircle } from 'lucide-react';

function Equipment() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Equipment</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Equipment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <Tool className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">MRI Scanner</h3>
              <p className="text-sm text-gray-500">Model: GE Healthcare SIGNA</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Operational
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-500">Last Maintenance</span>
              <span>2024-02-15</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <Tool className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">X-Ray Machine</h3>
              <p className="text-sm text-gray-500">Model: Siemens MULTIX</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="flex items-center text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                Needs Attention
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-500">Last Maintenance</span>
              <span>2024-01-20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipment;