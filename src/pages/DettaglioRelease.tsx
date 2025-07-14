import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  Music, 
  FileText, 
  Hash, 
  Globe,
  Calendar,
  User,
  Disc,
  Video,
  FileSpreadsheet,
  Download,
  Upload,
  Eye,
  Trash2,
  Plus,
  CheckCircle,
  AlertTriangle,
  Settings,
  BarChart3
} from 'lucide-react';

// Dati mock per il dettaglio release
const releaseData = {
  id: 1,
  cover: 'https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=SV',
  titolo: 'Summer Vibes',
  artista: 'Mario Rossi',
  label: 'Unda Records',
  isrc: 'IT-ABC-24-00001',
  upc: '123456789012',
  appleId: '1234567890',
  tipo: 'Album',
  numeroTracce: 12,
  dataCreazione: '2024-01-15',
  dataModifica: '2024-01-20',
  stato: 'Attiva',
  contratti: [
    {
      id: 1,
      tipo: 'Fisso',
      percentuale: 15,
      modalita: 'Pro-rata',
      applicabilita: ['Spotify', 'YouTube', 'Apple Music'],
      paesi: ['Italia', 'Europa'],
      durata: '24 mesi',
      scadenza: '2024-12-31'
    },
    {
      id: 2,
      tipo: 'Soglia',
      percentuale: 20,
      modalita: 'Titolarità',
      applicabilita: ['Amazon Music', 'Deezer'],
      paesi: ['Mondo'],
      durata: '12 mesi',
      scadenza: '2025-06-30'
    }
  ],
  tracce: [
    {
      id: 1,
      titolo: 'Summer Vibes',
      artista: 'Mario Rossi',
      durata: '3:45',
      isrc: 'IT-ABC-24-00001-01',
      upc: '123456789012-01',
      royalties: 12500
    },
    {
      id: 2,
      titolo: 'Electric Dreams',
      artista: 'Mario Rossi',
      durata: '4:12',
      isrc: 'IT-ABC-24-00001-02',
      upc: '123456789012-02',
      royalties: 8900
    },
    {
      id: 3,
      titolo: 'Ocean Waves',
      artista: 'Mario Rossi',
      durata: '3:58',
      isrc: 'IT-ABC-24-00001-03',
      upc: '123456789012-03',
      royalties: 11200
    }
  ],
  associazioni: [
    {
      id: 1,
      isrc: 'IT-ABC-24-00001',
      upc: '123456789012',
      store: 'Spotify',
      url: 'https://open.spotify.com/track/...',
      stato: 'Attiva'
    },
    {
      id: 2,
      isrc: 'IT-ABC-24-00001',
      upc: '123456789012',
      store: 'YouTube',
      url: 'https://youtube.com/watch?v=...',
      stato: 'Attiva'
    },
    {
      id: 3,
      isrc: 'IT-ABC-24-00001',
      upc: '123456789012',
      store: 'Apple Music',
      url: 'https://music.apple.com/...',
      stato: 'Attiva'
    }
  ]
};

const DettaglioRelease: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dettagli');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'dettagli', label: 'Dettagli', icon: Music },
    { id: 'contratti', label: 'Contratti', icon: FileText },
    { id: 'tracce', label: 'Tracce', icon: Disc },
    { id: 'associazioni', label: 'Associazioni ISRC/UPC', icon: Hash }
  ];

  const renderDettagli = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Titolo</label>
          <input
            type="text"
            value={releaseData.titolo}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Artista</label>
          <input
            type="text"
            value={releaseData.artista}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
          <input
            type="text"
            value={releaseData.label}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ISRC</label>
          <input
            type="text"
            value={releaseData.isrc}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">UPC</label>
          <input
            type="text"
            value={releaseData.upc}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Apple ID</label>
          <input
            type="text"
            value={releaseData.appleId}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
          <select
            value={releaseData.tipo}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="Album">Album</option>
            <option value="Traccia">Traccia</option>
            <option value="Video">Video</option>
            <option value="Compilation">Compilation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Numero Tracce</label>
          <input
            type="number"
            value={releaseData.numeroTracce}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Creazione</label>
          <input
            type="date"
            value={releaseData.dataCreazione}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Modifica</label>
          <input
            type="date"
            value={releaseData.dataModifica}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Stato</label>
        <select
          value={releaseData.stato}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={!isEditing}
        >
          <option value="Attiva">Attiva</option>
          <option value="Archiviata">Archiviata</option>
          <option value="In Revisione">In Revisione</option>
        </select>
      </div>
    </div>
  );

  const renderContratti = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Contratti</h3>
        {isEditing && (
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nuovo Contratto</span>
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {releaseData.contratti.map((contratto) => (
          <div key={contratto.id} className="p-6 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-gray-900">Contratto #{contratto.id}</h4>
                <p className="text-sm text-gray-600">{contratto.tipo} - {contratto.durata}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <Download className="w-4 h-4" />
                </button>
                {isEditing && (
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Percentuale</label>
                <p className="text-sm text-gray-900">{contratto.percentuale}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modalità</label>
                <p className="text-sm text-gray-900">{contratto.modalita}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scadenza</label>
                <p className="text-sm text-gray-900">{new Date(contratto.scadenza).toLocaleDateString('it-IT')}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Applicabilità</label>
              <div className="flex flex-wrap gap-2">
                {contratto.applicabilita.map((store, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {store}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Paesi</label>
              <div className="flex flex-wrap gap-2">
                {contratto.paesi.map((paese, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {paese}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTracce = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Tracce</h3>
        {isEditing && (
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Aggiungi Traccia</span>
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Titolo</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Artista</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Durata</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ISRC</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">UPC</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Royalties</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {releaseData.tracce.map((traccia) => (
              <tr key={traccia.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{traccia.id}</td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">{traccia.titolo}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{traccia.artista}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{traccia.durata}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{traccia.isrc}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{traccia.upc}</td>
                <td className="px-4 py-2 text-sm text-gray-900">€{traccia.royalties.toLocaleString()}</td>
                <td className="px-4 py-2 text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    {isEditing && (
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAssociazioni = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Associazioni ISRC/UPC</h3>
        {isEditing && (
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nuova Associazione</span>
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {releaseData.associazioni.map((associazione) => (
          <div key={associazione.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{associazione.isrc}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{associazione.upc}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    associazione.stato === 'Attiva' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {associazione.stato}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{associazione.store}</span>
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye className="w-4 h-4" />
                </button>
                {isEditing && (
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2">
              <a href={associazione.url} className="text-sm text-blue-600 hover:text-blue-800">
                {associazione.url}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dettagli':
        return renderDettagli();
      case 'contratti':
        return renderContratti();
      case 'tracce':
        return renderTracce();
      case 'associazioni':
        return renderAssociazioni();
      default:
        return renderDettagli();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span>Torna al catalogo</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{releaseData.titolo}</h1>
            <p className="text-gray-600">Dettaglio release completo</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Salva</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Annulla</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Modifica</span>
            </button>
          )}
        </div>
      </div>

      {/* Cover e Info Base */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-start space-x-6">
          <img
            src={releaseData.cover}
            alt={`Cover ${releaseData.titolo}`}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <div className="flex items-center space-x-2">
                  {releaseData.tipo === 'Album' && <Disc className="w-4 h-4 text-blue-600" />}
                  {releaseData.tipo === 'Traccia' && <Music className="w-4 h-4 text-green-600" />}
                  {releaseData.tipo === 'Video' && <Video className="w-4 h-4 text-red-600" />}
                  <span className="text-sm text-gray-900">{releaseData.tipo}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numero Tracce</label>
                <span className="text-sm text-gray-900">{releaseData.numeroTracce}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stato</label>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  releaseData.stato === 'Attiva' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {releaseData.stato}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Creazione</label>
                <span className="text-sm text-gray-900">{new Date(releaseData.dataCreazione).toLocaleDateString('it-IT')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DettaglioRelease; 