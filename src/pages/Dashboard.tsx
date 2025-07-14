import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertTriangle, 
  Upload, 
  UserPlus, 
  FileSpreadsheet,
  Bell,
  Newspaper,
  DollarSign,
  Calendar,
  Download,
  Eye,
  Edit,
  Send,
  Archive
} from 'lucide-react';
import ThemeExample from '../components/ui/ThemeExample';

// Dati mock per il grafico royalties ultimi 12 mesi
const royaltiesData = [
  { month: 'Gen', royalties: 125000, target: 100000 },
  { month: 'Feb', royalties: 138000, target: 100000 },
  { month: 'Mar', royalties: 142000, target: 100000 },
  { month: 'Apr', royalties: 156000, target: 100000 },
  { month: 'Mag', royalties: 168000, target: 100000 },
  { month: 'Giu', royalties: 175000, target: 100000 },
  { month: 'Lug', royalties: 182000, target: 100000 },
  { month: 'Ago', royalties: 195000, target: 100000 },
  { month: 'Set', royalties: 208000, target: 100000 },
  { month: 'Ott', royalties: 215000, target: 100000 },
  { month: 'Nov', royalties: 228000, target: 100000 },
  { month: 'Dic', royalties: 245000, target: 100000 }
];

// Dati mock per le news
const newsData = [
  {
    id: 1,
    title: 'Nuovo aggiornamento sistema di importazione',
    content: 'Miglioramenti nella gestione dei file CSV per importazione royalties',
    date: '2024-01-15',
    type: 'update'
  },
  {
    id: 2,
    title: 'Nuovi contratti in scadenza',
    content: '5 contratti scadono nei prossimi 30 giorni. Controlla la sezione Anagrafiche.',
    date: '2024-01-14',
    type: 'warning'
  },
  {
    id: 3,
    title: 'Rendiconti gennaio 2024 pronti',
    content: 'Tutti i rendiconti per gennaio 2024 sono stati generati e sono disponibili per il download.',
    date: '2024-01-13',
    type: 'info'
  }
];

// Dati mock per le notifiche di sistema
const systemNotifications = [
  {
    id: 1,
    title: 'Errore importazione file royalties',
    message: 'File "royalties_spotify_jan2024.csv" non può essere processato. Controlla il formato.',
    type: 'error',
    timestamp: '2024-01-15 14:30'
  },
  {
    id: 2,
    title: 'Nuove ingestion disponibili',
    message: '15 nuove release trovate su Spotify. Vai alla sezione Ingestion per revisionare.',
    type: 'info',
    timestamp: '2024-01-15 12:15'
  },
  {
    id: 3,
    title: 'Contratti scaduti',
    message: '3 contratti sono scaduti oggi. Controlla la sezione Anagrafiche.',
    type: 'warning',
    timestamp: '2024-01-15 09:45'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Admin</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Bell className="w-4 h-4" />
            <span>Notifiche</span>
          </button>
        </div>
      </div>

      {/* KPI Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Royalties Totali Pagate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">€2.456.789</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% vs mese scorso
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Artisti Attivi</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">247</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8 nuovi questo mese
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Contratti in Scadenza</p>
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-orange-600 flex items-center mt-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Nei prossimi 30 giorni
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rendiconti Generati</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1.234</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +156 questo mese
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Grafico Royalties */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Royalties Distribuite - Ultimi 12 Mesi</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Line Chart</button>
            <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md">Bar Chart</button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={royaltiesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `€${value.toLocaleString()}`, 
                  name === 'royalties' ? 'Royalties' : 'Target'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="royalties" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#EF4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Collegamenti Rapidi */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Collegamenti Rapidi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Upload className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-blue-900 dark:text-blue-400">Carica Nuovo File Royalties</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Import CSV/XLS</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <UserPlus className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900 dark:text-green-400">Aggiungi Nuovo Artista</p>
              <p className="text-sm text-green-600 dark:text-green-500">Nuovo partner</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <FileSpreadsheet className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-purple-900 dark:text-purple-400">Generazione Rendiconto</p>
              <p className="text-sm text-purple-600 dark:text-purple-500">Crea rendiconti</p>
            </div>
          </button>
        </div>
      </div>

      {/* News e Notifiche */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blocco News */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">News & Aggiornamenti</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Vedi tutte
            </button>
          </div>
          <div className="space-y-4">
            {newsData.map((news) => (
              <div key={news.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{news.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{news.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{news.date}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    news.type === 'update' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' :
                    news.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400' :
                    'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                  }`}>
                    {news.type === 'update' ? 'Aggiornamento' :
                     news.type === 'warning' ? 'Attenzione' : 'Info'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifiche di Sistema */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifiche di Sistema</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Gestisci
            </button>
          </div>
          <div className="space-y-4">
            {systemNotifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border-l-4 ${
                notification.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-500' :
                notification.type === 'warning' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400 dark:border-orange-500' :
                'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{notification.timestamp}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    notification.type === 'error' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' :
                    notification.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400' :
                    'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                  }`}>
                    {notification.type === 'error' ? 'Errore' :
                     notification.type === 'warning' ? 'Attenzione' : 'Info'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Esempio Tema Scuro */}
      <ThemeExample />
    </div>
  );
};

export default Dashboard; 