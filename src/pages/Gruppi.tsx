import React, { useState } from 'react';
import { 
  Users2, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  User,
  Crown,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dati mock per i gruppi
const gruppiData = [
  {
    id: 1,
    nome: 'Rock Band Italia',
    capogruppo: 'Mario Rossi',
    membri: ['Mario Rossi', 'Giulia Bianchi', 'Luca Verdi'],
    stato: 'Attivo',
    rendicontazione: 'Completata'
  },
  {
    id: 2,
    nome: 'Jazz Ensemble',
    capogruppo: 'Anna Neri',
    membri: ['Anna Neri', 'Marco Gialli'],
    stato: 'Attivo',
    rendicontazione: 'In corso'
  },
  {
    id: 3,
    nome: 'Pop Collective',
    capogruppo: 'Sofia Bianchi',
    membri: ['Sofia Bianchi', 'Roberto Verdi', 'Elena Rossi'],
    stato: 'Inattivo',
    rendicontazione: 'Completata'
  }
];

const Gruppi: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStato, setFilterStato] = useState('Tutti');
  const navigate = useNavigate();

  const handleAction = (action: string, id: number) => {
    console.log(`${action} gruppo ${id}`);
  };

  const filteredGruppi = gruppiData.filter(gruppo => {
    const matchesSearch = gruppo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gruppo.capogruppo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStato = filterStato === 'Tutti' || gruppo.stato === filterStato;
    return matchesSearch && matchesStato;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gruppi</h1>
          <p className="text-gray-600 mt-1">Gestione gruppi musicali e capogruppo</p>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/gruppi/nuovo')}
        >
          <Plus className="w-4 h-4" />
          <span>Nuovo Gruppo</span>
        </button>
      </div>

      {/* Filtri */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca per nome gruppo o capogruppo..."
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
              <option value="Attivo">Attivo</option>
              <option value="Inattivo">Inattivo</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista Gruppi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome Gruppo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capogruppo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rendicontazione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGruppi.map((gruppo) => (
                <tr key={gruppo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{gruppo.nome}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-900">{gruppo.capogruppo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {gruppo.membri.length} {gruppo.membri.length === 1 ? 'membro' : 'membri'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {gruppo.membri.slice(0, 2).join(', ')}
                      {gruppo.membri.length > 2 && ` +${gruppo.membri.length - 2} altri`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      gruppo.stato === 'Attivo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {gruppo.stato === 'Attivo' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {gruppo.stato}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      gruppo.rendicontazione === 'Completata' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {gruppo.rendicontazione}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction('visualizza', gruppo.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Visualizza dettagli"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('modifica', gruppo.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Modifica"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {gruppo.stato === 'Inattivo' && (
                        <button
                          onClick={() => handleAction('elimina', gruppo.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Elimina"
                        >
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

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totali Gruppi</p>
              <p className="text-2xl font-bold text-gray-900">{gruppiData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gruppi Attivi</p>
              <p className="text-2xl font-bold text-gray-900">
                {gruppiData.filter(g => g.stato === 'Attivo').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totali Membri</p>
              <p className="text-2xl font-bold text-gray-900">
                {gruppiData.reduce((total, gruppo) => total + gruppo.membri.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gruppi; 