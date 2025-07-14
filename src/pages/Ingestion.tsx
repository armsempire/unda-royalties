import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Music,
  Video,
  Globe,
  Calendar,
  Play,
  Pause
} from 'lucide-react';

// Dati mock per l'ingestion
const ingestionData = [
  {
    id: 1,
    fonte: 'Spotify',
    titolo: 'Summer Vibes - Mario Rossi',
    artista: 'Mario Rossi',
    dataRilevamento: '2024-01-15 14:30',
    stato: 'Da Importare',
    tipo: 'Album',
    numeroTracce: 12,
    isrc: 'IT-ABC-24-00001',
    upc: '123456789012',
    royalties: 2500
  },
  {
    id: 2,
    fonte: 'YouTube',
    titolo: 'Electric Dreams - Giulia Bianchi',
    artista: 'Giulia Bianchi',
    dataRilevamento: '2024-01-15 12:15',
    stato: 'Importata',
    tipo: 'Traccia',
    numeroTracce: 1,
    isrc: 'IT-ABC-24-00002',
    upc: '123456789013',
    royalties: 1800
  },
  {
    id: 3,
    fonte: 'Spotify',
    titolo: 'Rock Revolution - Luca Verdi',
    artista: 'Luca Verdi',
    dataRilevamento: '2024-01-15 10:45',
    stato: 'Ignorata',
    tipo: 'Compilation',
    numeroTracce: 8,
    isrc: 'IT-ABC-24-00003',
    upc: '123456789014',
    royalties: 3200
  },
  {
    id: 4,
    fonte: 'YouTube',
    titolo: 'Jazz Night Live - Anna Neri',
    artista: 'Anna Neri',
    dataRilevamento: '2024-01-15 09:20',
    stato: 'Da Importare',
    tipo: 'Video',
    numeroTracce: 1,
    isrc: 'IT-ABC-24-00004',
    upc: '123456789015',
    royalties: 1500
  },
  {
    id: 5,
    fonte: 'Spotify',
    titolo: 'Pop Hits 2024 - Marco Gialli',
    artista: 'Marco Gialli',
    dataRilevamento: '2024-01-15 08:10',
    stato: 'Importata',
    tipo: 'Album',
    numeroTracce: 15,
    isrc: 'IT-ABC-24-00005',
    upc: '123456789016',
    royalties: 4200
  }
];

const Ingestion: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFonte, setFilterFonte] = useState('Tutte');
  const [filterStato, setFilterStato] = useState('Tutti');

  const filteredIngestion = ingestionData.filter(release => {
    const matchesSearch = release.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.artista.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.isrc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFonte = filterFonte === 'Tutte' || release.fonte === filterFonte;
    const matchesStato = filterStato === 'Tutti' || release.stato === filterStato;
    return matchesSearch && matchesFonte && matchesStato;
  });

  const getFonteIcon = (fonte: string) => {
    return fonte === 'Spotify' ? Music : Video;
  };

  const getFonteColor = (fonte: string) => {
    return fonte === 'Spotify' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatoColor = (stato: string) => {
    switch (stato) {
      case 'Da Importare':
        return 'bg-blue-100 text-blue-800';
      case 'Importata':
        return 'bg-green-100 text-green-800';
      case 'Ignorata':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatoIcon = (stato: string) => {
    switch (stato) {
      case 'Da Importare':
        return Clock;
      case 'Importata':
        return CheckCircle;
      case 'Ignorata':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const handleAction = (action: string, id: number) => {
    console.log(`${action} release ${id}`);
    // Qui implementeremo le azioni reali
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ingestion</h1>
          <p className="text-gray-600 mt-1">Release trovate automaticamente da YouTube/Spotify tramite API</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Play className="w-4 h-4" />
            <span>Avvia Scansione</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Importa Selezionate</span>
          </button>
        </div>
      </div>

      {/* Filtri e Ricerca */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca per titolo, artista o ISRC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterFonte}
              onChange={(e) => setFilterFonte(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tutte">Tutte le fonti</option>
              <option value="Spotify">Spotify</option>
              <option value="YouTube">YouTube</option>
            </select>
            <select
              value={filterStato}
              onChange={(e) => setFilterStato(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tutti">Tutti gli stati</option>
              <option value="Da Importare">Da Importare</option>
              <option value="Importata">Importata</option>
              <option value="Ignorata">Ignorata</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabella Ingestion */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fonte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titolo Release
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Rilevamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Royalties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIngestion.map((release) => {
                const FonteIcon = getFonteIcon(release.fonte);
                const StatoIcon = getStatoIcon(release.stato);
                return (
                  <tr key={release.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <FonteIcon className="w-4 h-4 text-gray-400" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFonteColor(release.fonte)}`}>
                          {release.fonte}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{release.titolo}</div>
                        <div className="text-sm text-gray-500">{release.artista}</div>
                        <div className="text-xs text-gray-400">
                          {release.tipo} • {release.numeroTracce} {release.numeroTracce === 1 ? 'traccia' : 'tracce'} • ISRC: {release.isrc}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(release.dataRilevamento).toLocaleString('it-IT')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <StatoIcon className="w-4 h-4" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatoColor(release.stato)}`}>
                          {release.stato}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      €{release.royalties.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction('visualizza', release.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Visualizza dettaglio"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {release.stato === 'Da Importare' && (
                          <>
                            <button
                              onClick={() => handleAction('importa', release.id)}
                              className="text-green-600 hover:text-green-900 p-1 rounded"
                              title="Importa nel catalogo"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction('ignora', release.id)}
                              className="text-orange-600 hover:text-orange-900 p-1 rounded"
                              title="Ignora"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleAction('elimina', release.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Elimina"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totali Release</p>
              <p className="text-2xl font-bold text-gray-900">{ingestionData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Importate</p>
              <p className="text-2xl font-bold text-gray-900">
                {ingestionData.filter(r => r.stato === 'Importata').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Da Importare</p>
              <p className="text-2xl font-bold text-gray-900">
                {ingestionData.filter(r => r.stato === 'Da Importare').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gray-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ignorate</p>
              <p className="text-2xl font-bold text-gray-900">
                {ingestionData.filter(r => r.stato === 'Ignorata').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Informazioni API */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">API Integration</h3>
            <p className="text-sm text-blue-700 mt-1">
              Le release vengono rilevate automaticamente tramite API di Spotify e YouTube. 
              La scansione viene eseguita ogni 6 ore per identificare nuove release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingestion; 