import React, { useState } from 'react';
import { 
  User, 
  Download, 
  Eye, 
  BarChart3,
  Euro,
  TrendingUp,
  Calendar,
  FileText,
  CreditCard,
  MessageSquare,
  Music,
  Settings
} from 'lucide-react';

// Dati mock per l'artista
const artistaData = {
  nome: 'Mario Rossi',
  email: 'mario.rossi@email.com',
  royaltiesTotali: 15680.50,
  royaltiesMese: 2340.75,
  pagamentiRicevuti: 8,
  contrattiAttivi: 3,
  newsRicevute: 5
};

const royaltiesMensili = [
  { mese: 'Gen', importo: 2340.75 },
  { mese: 'Dic', importo: 1890.50 },
  { mese: 'Nov', importo: 2150.25 },
  { mese: 'Ott', importo: 1980.00 },
  { mese: 'Set', importo: 2240.30 },
  { mese: 'Ago', importo: 1870.45 }
];

const ultimiPagamenti = [
  {
    id: 1,
    data: '2024-01-15',
    importo: 2340.75,
    fonte: 'Spotify',
    stato: 'Completato'
  },
  {
    id: 2,
    data: '2023-12-15',
    importo: 1890.50,
    fonte: 'YouTube',
    stato: 'Completato'
  },
  {
    id: 3,
    data: '2023-11-15',
    importo: 2150.25,
    fonte: 'Apple Music',
    stato: 'Completato'
  }
];

const newsRicevute = [
  {
    id: 1,
    titolo: 'Nuove funzionalità disponibili',
    data: '2024-01-20',
    letta: true
  },
  {
    id: 2,
    titolo: 'Aggiornamento contratti Spotify',
    data: '2024-01-18',
    letta: false
  },
  {
    id: 3,
    titolo: 'Manutenzione sistema',
    data: '2024-01-15',
    letta: true
  }
];

const contrattiAttivi = [
  {
    id: 1,
    tipo: 'Contratto Fisso 15%',
    store: 'Spotify',
    scadenza: '2024-12-31',
    stato: 'Attivo'
  },
  {
    id: 2,
    tipo: 'Contratto Soglia 20%',
    store: 'YouTube',
    scadenza: '2024-06-30',
    stato: 'Attivo'
  },
  {
    id: 3,
    tipo: 'Contratto Fisso 12%',
    store: 'Apple Music',
    scadenza: '2024-03-31',
    stato: 'Attivo'
  }
];

const AccessoArtista: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6-mesi');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Artista</h1>
          <p className="text-gray-600 mt-1">Benvenuto, {artistaData.nome}</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="6-mesi">Ultimi 6 mesi</option>
            <option value="12-mesi">Ultimi 12 mesi</option>
            <option value="24-mesi">Ultimi 24 mesi</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Impostazioni</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Euro className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Royalties Totali</p>
              <p className="text-2xl font-bold text-gray-900">€{artistaData.royaltiesTotali.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Questo Mese</p>
              <p className="text-2xl font-bold text-gray-900">€{artistaData.royaltiesMese.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pagamenti Ricevuti</p>
              <p className="text-2xl font-bold text-gray-900">{artistaData.pagamentiRicevuti}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Music className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contratti Attivi</p>
              <p className="text-2xl font-bold text-gray-900">{artistaData.contrattiAttivi}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grafico Royalties */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Andamento Royalties</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Grafico royalties ultimi 6 mesi</p>
            <p className="text-sm text-gray-400">Integrazione con libreria grafici</p>
          </div>
        </div>
      </div>

      {/* Ultimi Pagamenti e News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ultimi Pagamenti */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ultimi Pagamenti Ricevuti</h2>
          <div className="space-y-4">
            {ultimiPagamenti.map((pagamento) => (
              <div key={pagamento.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{pagamento.fonte}</p>
                    <p className="text-sm text-gray-500">{new Date(pagamento.data).toLocaleDateString('it-IT')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">€{pagamento.importo.toLocaleString()}</p>
                  <p className="text-sm text-green-600">{pagamento.stato}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <Download className="w-4 h-4" />
              <span>Scarica tutti i rendiconti</span>
            </button>
          </div>
        </div>

        {/* News Ricevute */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">News Ricevute</h2>
          <div className="space-y-4">
            {newsRicevute.map((news) => (
              <div key={news.id} className={`p-4 rounded-lg border-l-4 ${
                news.letta ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${news.letta ? 'text-gray-900' : 'text-blue-900'}`}>
                      {news.titolo}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(news.data).toLocaleDateString('it-IT')}</p>
                  </div>
                  {!news.letta && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Nuova
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <MessageSquare className="w-4 h-4" />
              <span>Vedi tutte le news</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contratti Attivi */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Contratti Attivi (Sola Lettura)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contrattiAttivi.map((contratto) => (
            <div key={contratto.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{contratto.tipo}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {contratto.stato}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Store:</span> {contratto.store}</p>
                <p><span className="font-medium">Scadenza:</span> {new Date(contratto.scadenza).toLocaleDateString('it-IT')}</p>
              </div>
              <div className="mt-3">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Visualizza dettagli</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Rendiconti */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Download Rendiconti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Rendiconto PDF</h3>
                <p className="text-sm text-gray-500">Formato PDF per stampa</p>
              </div>
            </div>
            <button className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <Download className="w-4 h-4" />
              <span>Scarica PDF</span>
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-medium text-gray-900">Rendiconto CSV</h3>
                <p className="text-sm text-gray-500">Formato CSV per analisi</p>
              </div>
            </div>
            <button className="mt-3 flex items-center space-x-2 text-green-600 hover:text-green-800">
              <Download className="w-4 h-4" />
              <span>Scarica CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoArtista; 