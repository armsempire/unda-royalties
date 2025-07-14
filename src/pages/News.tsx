import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Send,
  Calendar,
  User,
  Eye,
  Search,
  Filter
} from 'lucide-react';

// Dati mock per le news
const newsData = [
  {
    id: 1,
    titolo: 'Nuove funzionalità disponibili',
    testo: 'Abbiamo aggiunto nuove funzionalità per la gestione dei pagamenti automatici...',
    autore: 'Admin',
    data: '2024-01-20',
    stato: 'Pubblicata',
    inviata: true
  },
  {
    id: 2,
    titolo: 'Aggiornamento contratti Spotify',
    testo: 'Nuove condizioni contrattuali per i pagamenti Spotify a partire da febbraio...',
    autore: 'Admin',
    data: '2024-01-18',
    stato: 'Bozza',
    inviata: false
  },
  {
    id: 3,
    titolo: 'Manutenzione sistema',
    testo: 'Il sistema sarà in manutenzione il 25 gennaio dalle 2:00 alle 4:00...',
    autore: 'Admin',
    data: '2024-01-15',
    stato: 'Pubblicata',
    inviata: true
  }
];

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStato, setFilterStato] = useState('Tutti');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titolo: '',
    testo: '',
    invioAutomatico: false
  });

  const handleAction = (action: string, id: number) => {
    console.log(`${action} news ${id}`);
  };

  const handleSubmit = () => {
    console.log('Salva news:', formData);
    setShowForm(false);
    setFormData({ titolo: '', testo: '', invioAutomatico: false });
  };

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.testo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStato = filterStato === 'Tutti' || news.stato === filterStato;
    return matchesSearch && matchesStato;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Comunicazioni</h1>
          <p className="text-gray-600 mt-1">Gestione comunicazioni interne e news</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nuova News</span>
        </button>
      </div>

      {/* Form Nuova News */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Crea Nuova News</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titolo</label>
              <input
                type="text"
                value={formData.titolo}
                onChange={(e) => setFormData(prev => ({ ...prev, titolo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inserisci il titolo della news"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Testo</label>
              <textarea
                value={formData.testo}
                onChange={(e) => setFormData(prev => ({ ...prev, testo: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inserisci il contenuto della news"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="invioAutomatico"
                checked={formData.invioAutomatico}
                onChange={(e) => setFormData(prev => ({ ...prev, invioAutomatico: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="invioAutomatico" className="text-sm text-gray-700">
                Invio automatico a tutti gli artisti
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salva News
            </button>
          </div>
        </div>
      )}

      {/* Filtri */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca per titolo o contenuto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStato}
              onChange={(e) => setFilterStato(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tutti">Tutti gli stati</option>
              <option value="Pubblicata">Pubblicata</option>
              <option value="Bozza">Bozza</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista News */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titolo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autore
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inviata
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNews.map((news) => (
                <tr key={news.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{news.titolo}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{news.testo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{news.autore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {new Date(news.data).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      news.stato === 'Pubblicata' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {news.stato}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      news.inviata 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {news.inviata ? 'Sì' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction('visualizza', news.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Visualizza"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('modifica', news.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Modifica"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {!news.inviata && (
                        <button
                          onClick={() => handleAction('invia', news.id)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Invia"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleAction('elimina', news.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Elimina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totali News</p>
              <p className="text-2xl font-bold text-gray-900">{newsData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Send className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">News Inviate</p>
              <p className="text-2xl font-bold text-gray-900">
                {newsData.filter(n => n.inviata).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Edit className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Bozza</p>
              <p className="text-2xl font-bold text-gray-900">
                {newsData.filter(n => n.stato === 'Bozza').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News; 