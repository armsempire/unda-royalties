import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Music,
  Video,
  Disc,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dati mock per il catalogo
const catalogoData = [
  {
    id: 1,
    cover: 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=MR',
    titolo: 'Summer Vibes',
    artista: 'Mario Rossi',
    tipo: 'Album',
    dataCreazione: '2024-01-15',
    dataModifica: '2024-01-20',
    aventiDiritto: ['Mario Rossi', 'Giulia Bianchi'],
    stato: 'Attiva',
    numeroTracce: 12,
    isrc: 'IT-ABC-24-00001',
    upc: '123456789012'
  },
  {
    id: 2,
    cover: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=GB',
    titolo: 'Electric Dreams',
    artista: 'Giulia Bianchi',
    tipo: 'Traccia',
    dataCreazione: '2024-01-10',
    dataModifica: '2024-01-12',
    aventiDiritto: ['Giulia Bianchi'],
    stato: 'Attiva',
    numeroTracce: 1,
    isrc: 'IT-ABC-24-00002',
    upc: '123456789013'
  },
  {
    id: 3,
    cover: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=LV',
    titolo: 'Rock Revolution',
    artista: 'Luca Verdi',
    tipo: 'Compilation',
    dataCreazione: '2024-01-05',
    dataModifica: '2024-01-08',
    aventiDiritto: ['Luca Verdi', 'Anna Neri', 'Marco Gialli'],
    stato: 'Archiviata',
    numeroTracce: 8,
    isrc: 'IT-ABC-24-00003',
    upc: '123456789014'
  },
  {
    id: 4,
    cover: 'https://via.placeholder.com/60x60/EF4444/FFFFFF?text=AN',
    titolo: 'Jazz Night Live',
    artista: 'Anna Neri',
    tipo: 'Video',
    dataCreazione: '2024-01-03',
    dataModifica: '2024-01-05',
    aventiDiritto: ['Anna Neri'],
    stato: 'Attiva',
    numeroTracce: 1,
    isrc: 'IT-ABC-24-00004',
    upc: '123456789015'
  },
  {
    id: 5,
    cover: 'https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=MG',
    titolo: 'Pop Hits 2024',
    artista: 'Marco Gialli',
    tipo: 'Album',
    dataCreazione: '2024-01-01',
    dataModifica: '2024-01-02',
    aventiDiritto: ['Marco Gialli'],
    stato: 'Attiva',
    numeroTracce: 15,
    isrc: 'IT-ABC-24-00005',
    upc: '123456789016'
  }
];

const Catalogo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('Tutti');
  const [filterStato, setFilterStato] = useState('Tutti');
  const navigate = useNavigate();

  const filteredCatalogo = catalogoData.filter(release => {
    const matchesSearch = release.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.artista.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.isrc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'Tutti' || release.tipo === filterTipo;
    const matchesStato = filterStato === 'Tutti' || release.stato === filterStato;
    return matchesSearch && matchesTipo && matchesStato;
  });

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Album':
        return Disc;
      case 'Traccia':
        return Music;
      case 'Video':
        return Video;
      case 'Compilation':
        return FileText;
      default:
        return Music;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Album':
        return 'bg-blue-100 text-blue-800';
      case 'Traccia':
        return 'bg-green-100 text-green-800';
      case 'Video':
        return 'bg-red-100 text-red-800';
      case 'Compilation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatoColor = (stato: string) => {
    return stato === 'Attiva' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
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
          <h1 className="text-2xl font-bold text-gray-900">Il Mio Catalogo</h1>
          <p className="text-gray-600 mt-1">Gestione centralizzata delle release musicali e video</p>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/catalogo/aggiungi')}
        >
          <Plus className="w-4 h-4" />
          <span>Aggiungi Release</span>
        </button>
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
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tutti">Tutti i tipi</option>
              <option value="Album">Album</option>
              <option value="Traccia">Traccia</option>
              <option value="Video">Video</option>
              <option value="Compilation">Compilation</option>
            </select>
            <select
              value={filterStato}
              onChange={(e) => setFilterStato(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tutti">Tutti gli stati</option>
              <option value="Attiva">Attiva</option>
              <option value="Archiviata">Archiviata</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista Release */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cover
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titolo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Creazione/Modifica
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aventi Diritto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCatalogo.map((release) => {
                const TipoIcon = getTipoIcon(release.tipo);
                return (
                  <tr key={release.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={release.cover}
                          alt={`Cover ${release.titolo}`}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{release.titolo}</div>
                        <div className="text-sm text-gray-500">{release.artista}</div>
                        <div className="text-xs text-gray-400">ISRC: {release.isrc}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <TipoIcon className="w-4 h-4 text-gray-400" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTipoColor(release.tipo)}`}>
                          {release.tipo}
                        </span>
                      </div>
                      {release.numeroTracce > 1 && (
                        <div className="text-xs text-gray-500 mt-1">{release.numeroTracce} tracce</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>Creata: {new Date(release.dataCreazione).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>Modificata: {new Date(release.dataModifica).toLocaleDateString('it-IT')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div className="text-sm text-gray-900">
                          {release.aventiDiritto.length} {release.aventiDiritto.length === 1 ? 'diritto' : 'diritti'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {release.aventiDiritto.slice(0, 2).join(', ')}
                        {release.aventiDiritto.length > 2 && ` +${release.aventiDiritto.length - 2} altri`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatoColor(release.stato)}`}>
                        {release.stato === 'Attiva' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {release.stato}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction('visualizza', release.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded flex items-center space-x-1"
                          title="Visualizza dettagli"
                        >
                          <Eye className="w-4 h-4" />
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleAction('modifica', release.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('download', release.id)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {release.stato === 'Attiva' && (
                          <button
                            onClick={() => handleAction('elimina', release.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Elimina (solo se non rendicontata)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
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
              <Music className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totali Release</p>
              <p className="text-2xl font-bold text-gray-900">{catalogoData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Release Attive</p>
              <p className="text-2xl font-bold text-gray-900">
                {catalogoData.filter(r => r.stato === 'Attiva').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Disc className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Album</p>
              <p className="text-2xl font-bold text-gray-900">
                {catalogoData.filter(r => r.tipo === 'Album').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Video className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Video</p>
              <p className="text-2xl font-bold text-gray-900">
                {catalogoData.filter(r => r.tipo === 'Video').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo; 