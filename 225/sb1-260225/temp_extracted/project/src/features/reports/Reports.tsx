import React, { useState } from 'react';
import { FileText, Download, Eye, CheckCircle, XCircle } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  generatedDate: string;
  technicianName: string;
  status: 'pending' | 'approved' | 'rejected';
  fileUrl: string;
}

function Reports() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Maintenance IRM - Février 2024',
      generatedDate: '2024-02-28',
      technicianName: 'Jean Dupont',
      status: 'pending',
      fileUrl: '#'
    },
    {
      id: '2',
      title: 'Inspection Scanner - Janvier 2024',
      generatedDate: '2024-01-31',
      technicianName: 'Marie Martin',
      status: 'approved',
      fileUrl: '#'
    }
  ]);

  const handleValidation = (reportId: string, status: 'approved' | 'rejected') => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status } : report
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Rapports de Maintenance</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Générer un Rapport
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center p-4 border rounded-lg">
                <div className="p-2 bg-blue-50 rounded">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-sm text-gray-500">
                    Généré le {report.generatedDate} par {report.technicianName}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    report.status === 'approved' ? 'bg-green-100 text-green-800' :
                    report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status === 'approved' ? 'Approuvé' :
                     report.status === 'rejected' ? 'Rejeté' : 'En attente'}
                  </span>
                  <div className="flex space-x-2">
                    {report.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleValidation(report.id, 'approved')}
                          className="p-2 text-green-600 hover:text-green-800"
                          title="Approuver"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleValidation(report.id, 'rejected')}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Rejeter"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;