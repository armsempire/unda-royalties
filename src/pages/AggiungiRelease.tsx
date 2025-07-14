import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Music, 
  Video, 
  Globe, 
  Upload, 
  Search, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Pause,
  Download,
  Eye,
  Edit,
  Trash2,
  Settings,
  FileText,
  Hash,
  Calendar,
  User,
  Disc
} from 'lucide-react';

// Dati mock per le release trovate su Spotify
const spotifyReleases = [
  {
    id: 1,
    titolo: 'Summer Vibes',
    artista: 'Mario Rossi',
    album: 'Summer Vibes',
    durata: '3:45',
    isrc: 'IT-ABC-24-00001',
    upc: '123456789012',
    cover: 'https://via.placeholder.com/60x60/1DB954/FFFFFF?text=SV',
    store: 'Spotify',
    url: 'https://open.spotify.com/track/...',
    royalties: 1250
  },
  {
    id: 2,
    titolo: 'Electric Dreams',
    artista: 'Giulia Bianchi',
    album: 'Electric Dreams',
    durata: '4:12',
    isrc: 'IT-ABC-24-00002',
    upc: '123456789013',
    cover: 'https://via.placeholder.com/60x60/1DB954/FFFFFF?text=ED',
    store: 'Spotify',
    url: 'https://open.spotify.com/track/...',
    royalties: 890
  }
];

// Dati mock per le release trovate su YouTube
const youtubeReleases = [
  {
    id: 3,
    titolo: 'Rock Revolution',
    artista: 'Luca Verdi',
    album: 'Rock Revolution',
    durata: '5:20',
    isrc: 'IT-ABC-24-00003',
    upc: '123456789014',
    cover: 'https://via.placeholder.com/60x60/FF0000/FFFFFF?text=RR',
    store: 'YouTube',
    url: 'https://youtube.com/watch?v=...',
    royalties: 1560
  },
  {
    id: 4,
    titolo: 'Jazz Night Live',
    artista: 'Anna Neri',
    album: 'Jazz Night Live',
    durata: '6:45',
    isrc: 'IT-ABC-24-00004',
    upc: '123456789015',
    cover: 'https://via.placeholder.com/60x60/FF0000/FFFFFF?text=JN',
    store: 'YouTube',
    url: 'https://youtube.com/watch?v=...',
    royalties: 2340
  }
];

const AggiungiRelease: React.FC = () => {
  const [activeTab, setActiveTab] = useState('importazione');
  const [selectedStore, setSelectedStore] = useState('spotify');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReleases, setSelectedReleases] = useState<number[]>([]);
  const [manualData, setManualData] = useState({
    titolo: '',
    artista: '',
    album: '',
    isrc: '',
    upc: '',
    appleId: '',
    tipo: 'Album',
    numeroTracce: 1,
    durata: '',
    label: '',
    dataPubblicazione: ''
  });

  const tabs = [
    { id: 'importazione', label: 'Importazione Automatica', icon: Download },
    { id: 'manuale', label: 'Inserimento Manuale', icon: Edit }
  ];

  const handleReleaseToggle = (id: number) => {
    setSelectedReleases(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentReleases = selectedStore === 'spotify' ? spotifyReleases : youtubeReleases;
    setSelectedReleases(currentReleases.map(r => r.id));
  };

  const handleDeselectAll = () => {
    setSelectedReleases([]);
  };

  const handleImportSelected = () => {
    console.log('Importazione release selezionate:', selectedReleases);
    // Qui implementeremo l'importazione reale
  };

  const handleManualSubmit = () => {
    console.log('Dati inserimento manuale:', manualData);
    // Qui implementeremo il salvataggio
  };

  const renderImportazioneAutomatica = () => (
    <div className="space-y-6">
      {/* Selezione Store */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Selezione Store</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedStore('spotify')}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              selectedStore === 'spotify'
                ? 'border-green-500 bg-green-50 text-green-900'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium">Spotify</div>
                <div className="text-sm text-gray-500">{spotifyReleases.length} release trovate</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setSelectedStore('youtube')}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              selectedStore === 'youtube'
                ? 'border-red-500 bg-red-50 text-red-900'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium">YouTube</div>
                <div className="text-sm text-gray-500">{youtubeReleases.length} release trovate</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Ricerca */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca release..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Play className="w-4 h-4" />
            <span>Scansiona Nuovo</span>
          </button>
        </div>
      </div>

      {/* Lista Release */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Release trovate su {selectedStore === 'spotify' ? 'Spotify' : 'YouTube'}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Seleziona Tutti
            </button>
            <button
              onClick={handleDeselectAll}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Deseleziona Tutti
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {(selectedStore === 'spotify' ? spotifyReleases : youtubeReleases)
            .filter(release => 
              release.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
              release.artista.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((release) => (
              <div
                key={release.id}
                className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedReleases.includes(release.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleReleaseToggle(release.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedReleases.includes(release.id)}
                      onChange={() => handleReleaseToggle(release.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <img
                      src={release.cover}
                      alt={`Cover ${release.titolo}`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{release.titolo}</div>
                      <div className="text-sm text-gray-500">{release.artista}</div>
                      <div className="text-xs text-gray-400">{release.album} • {release.durata}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">€{release.royalties.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{release.store}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  ISRC: {release.isrc} • UPC: {release.upc}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {selectedReleases.length} release selezionate
        </div>
        <button
          onClick={handleImportSelected}
          disabled={selectedReleases.length === 0}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Importa Selezionate
        </button>
      </div>
    </div>
  );

  const renderInserimentoManuale = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Dati Release</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titolo</label>
            <input
              type="text"
              value={manualData.titolo}
              onChange={(e) => setManualData(prev => ({ ...prev, titolo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Inserisci il titolo della release"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Artista</label>
            <input
              type="text"
              value={manualData.artista}
              onChange={(e) => setManualData(prev => ({ ...prev, artista: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Inserisci l'artista"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Album</label>
            <input
              type="text"
              value={manualData.album}
              onChange={(e) => setManualData(prev => ({ ...prev, album: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Inserisci il nome dell'album"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
            <input
              type="text"
              value={manualData.label}
              onChange={(e) => setManualData(prev => ({ ...prev, label: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Inserisci la label"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ISRC</label>
            <input
              type="text"
              value={manualData.isrc}
              onChange={(e) => setManualData(prev => ({ ...prev, isrc: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="IT-ABC-24-00001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">UPC</label>
            <input
              type="text"
              value={manualData.upc}
              onChange={(e) => setManualData(prev => ({ ...prev, upc: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123456789012"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Apple ID</label>
            <input
              type="text"
              value={manualData.appleId}
              onChange={(e) => setManualData(prev => ({ ...prev, appleId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234567890"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              value={manualData.tipo}
              onChange={(e) => setManualData(prev => ({ ...prev, tipo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              value={manualData.numeroTracce}
              onChange={(e) => setManualData(prev => ({ ...prev, numeroTracce: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durata</label>
            <input
              type="text"
              value={manualData.durata}
              onChange={(e) => setManualData(prev => ({ ...prev, durata: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3:45"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Pubblicazione</label>
            <input
              type="date"
              value={manualData.dataPubblicazione}
              onChange={(e) => setManualData(prev => ({ ...prev, dataPubblicazione: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Upload Cover */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cover Release</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">Clicca per caricare</span> o trascina qui
          </p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleManualSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Salva Release
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'importazione':
        return renderImportazioneAutomatica();
      case 'manuale':
        return renderInserimentoManuale();
      default:
        return renderImportazioneAutomatica();
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
            <h1 className="text-2xl font-bold text-gray-900">Aggiungi Release</h1>
            <p className="text-gray-600">Importazione automatica o inserimento manuale</p>
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

export default AggiungiRelease; 