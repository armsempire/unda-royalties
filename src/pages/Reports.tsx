import React, { useState } from 'react';
import { Download, FileText, Calendar, BarChart3, TrendingUp, Users } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('');

  const reports = [
    {
      id: 'financial',
      name: 'Report Finanziario',
      description: 'Analisi completa delle performance finanziarie',
      icon: BarChart3,
      lastGenerated: '2024-01-15',
      status: 'Disponibile'
    },
    {
      id: 'users',
      name: 'Report Utenti',
      description: 'Statistiche e attività degli utenti',
      icon: Users,
      lastGenerated: '2024-01-14',
      status: 'Disponibile'
    },
    {
      id: 'transactions',
      name: 'Report Transazioni',
      description: 'Dettaglio completo delle transazioni',
      icon: TrendingUp,
      lastGenerated: '2024-01-13',
      status: 'Disponibile'
    },
    {
      id: 'monthly',
      name: 'Report Mensile',
      description: 'Sintesi mensile delle attività',
      icon: Calendar,
      lastGenerated: '2024-01-01',
      status: 'In elaborazione'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Report</h1>
        <p className="text-gray-600 mt-2">Generazione e gestione dei report aziendali</p>
      </div>

      {/* Report types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  report.status === 'Disponibile' ? 'bg-blue-100' : 'bg-yellow-100'
                }`}>
                  <Icon className={`${
                    report.status === 'Disponibile' ? 'text-blue-600' : 'text-yellow-600'
                  }`} size={24} />
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  report.status === 'Disponibile' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Ultimo: {report.lastGenerated}
                </span>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                  <Download size={16} />
                  <span className="text-sm">Scarica</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate new report */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Genera Nuovo Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo di Report
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleziona un report</option>
              <option value="financial">Report Finanziario</option>
              <option value="users">Report Utenti</option>
              <option value="transactions">Report Transazioni</option>
              <option value="monthly">Report Mensile</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periodo
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Ultimi 30 giorni</option>
              <option>Ultimi 3 mesi</option>
              <option>Ultimi 6 mesi</option>
              <option>Ultimo anno</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FileText size={16} />
            <span>Genera Report</span>
          </button>
        </div>
      </div>

      {/* Recent reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Report Recenti</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Generazione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dimensione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Report_Finanziario_Gennaio_2024.pdf
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Finanziario
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-01-15 14:30
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2.4 MB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                    <Download size={16} />
                    <span>Scarica</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Report_Utenti_Dicembre_2023.pdf
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Utenti
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-01-14 10:15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1.8 MB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                    <Download size={16} />
                    <span>Scarica</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports; 