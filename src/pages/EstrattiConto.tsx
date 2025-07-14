import React, { useState } from 'react';
import { 
  Receipt, 
  Download, 
  Eye, 
  BarChart3,
  Euro,
  TrendingUp,
  Calendar,
  FileText,
  User,
  CreditCard,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const EstrattiConto: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estratti Conto</h1>
          <p className="text-gray-600 mt-1">Gestione saldi e storico royalties</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Esporta XLS</span>
          </button>
        </div>
      </div>

      {/* Saldo Attuale */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Saldo Attuale</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Saldo Positivo</p>
                <p className="text-2xl font-bold text-green-900">€45,230.50</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Royalties Totali</p>
                <p className="text-2xl font-bold text-blue-900">€89,450.75</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Euro className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Pagamenti Evasi</p>
                <p className="text-2xl font-bold text-orange-900">€44,220.25</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grafico Storico */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Storico Royalties (3 anni)</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Grafico storico royalties</p>
            <p className="text-sm text-gray-400">Integrazione con libreria grafici</p>
          </div>
        </div>
      </div>

      {/* Ultimi Pagamenti */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Ultimi Pagamenti Ricevuti</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Spotify - Gennaio 2024</p>
                <p className="text-sm text-gray-500">15 Gennaio 2024</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">€12,450.75</p>
              <p className="text-sm text-green-600">Completato</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">YouTube - Dicembre 2023</p>
                <p className="text-sm text-gray-500">10 Gennaio 2024</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">€8,230.50</p>
              <p className="text-sm text-green-600">Completato</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Apple Music - Dicembre 2023</p>
                <p className="text-sm text-gray-500">In elaborazione</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">€6,890.25</p>
              <p className="text-sm text-yellow-600">In attesa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dettaglio Condizioni Contrattuali */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Dettaglio Condizioni Contrattuali</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Spotify</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Percentuale:</span> 15% fisso</p>
                <p><span className="font-medium">Modalità:</span> Pro-rata</p>
                <p><span className="font-medium">Paesi:</span> Mondo</p>
                <p><span className="font-medium">Scadenza:</span> 31 Dicembre 2024</p>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-medium text-red-900 mb-2">YouTube</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Percentuale:</span> 20% soglia</p>
                <p><span className="font-medium">Modalità:</span> Titolarità</p>
                <p><span className="font-medium">Paesi:</span> Europa</p>
                <p><span className="font-medium">Scadenza:</span> 30 Giugno 2024</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Apple Music</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Percentuale:</span> 12% fisso</p>
                <p><span className="font-medium">Modalità:</span> Pro-rata</p>
                <p><span className="font-medium">Paesi:</span> Italia</p>
                <p><span className="font-medium">Scadenza:</span> 31 Marzo 2024</p>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">Amazon Music</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Percentuale:</span> 18% soglia</p>
                <p><span className="font-medium">Modalità:</span> Titolarità</p>
                <p><span className="font-medium">Paesi:</span> Mondo</p>
                <p><span className="font-medium">Scadenza:</span> 31 Dicembre 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstrattiConto; 