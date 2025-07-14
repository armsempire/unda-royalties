import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Send, 
  Archive, 
  MoreHorizontal,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dati mock per le anagrafiche
const anagraficheData = [
  {
    id: 1,
    nome: 'Mario Rossi',
    contatto: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    telefono: '+39 333 1234567',
    tipoContratto: 'Fisso',
    scadenzaContratto: '2024-12-31',
    stato: 'Attivo',
    royalties: 125000
  },
  {
    id: 2,
    nome: 'Giulia Bianchi',
    contatto: 'Giulia Bianchi',
    email: 'giulia.bianchi@email.com',
    telefono: '+39 333 2345678',
    tipoContratto: 'Soglia',
    scadenzaContratto: '2025-06-30',
    stato: 'Attivo',
    royalties: 89000
  },
  {
    id: 3,
    nome: 'Luca Verdi',
    contatto: 'Luca Verdi',
    email: 'luca.verdi@email.com',
    telefono: '+39 333 3456789',
    tipoContratto: 'Fisso',
    scadenzaContratto: '2024-03-15',
    stato: 'In Scadenza',
    royalties: 156000
  },
  {
    id: 4,
    nome: 'Anna Neri',
    contatto: 'Anna Neri',
    email: 'anna.neri@email.com',
    telefono: '+39 333 4567890',
    tipoContratto: 'Soglia',
    scadenzaContratto: '2025-09-20',
    stato: 'Attivo',
    royalties: 67000
  },
  {
    id: 5,
    nome: 'Marco Gialli',
    contatto: 'Marco Gialli',
    email: 'marco.gialli@email.com',
    telefono: '+39 333 5678901',
    tipoContratto: 'Fisso',
    scadenzaContratto: '2024-01-31',
    stato: 'Scaduto',
    royalties: 234000
  }
];

const Anagrafiche: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tutti');
  const [selectedAnagrafica, setSelectedAnagrafica] = useState<number | null>(null);
  const navigate = useNavigate();

  const filteredAnagrafiche = anagraficheData.filter(anagrafica => {
    const matchesSearch = anagrafica.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anagrafica.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Tutti' || anagrafica.stato === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case 'Attivo':
        return 'bg-green-100 text-green-800';
      case 'In Scadenza':
        return 'bg-orange-100 text-orange-800';
      case 'Scaduto':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractTypeColor = (tipo: string) => {
    return tipo === 'Fisso' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const handleAction = (action: string, id: number) => {
    console.log(`${action} anagrafica ${id}`);
    // Qui implementeremo le azioni reali
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Anagrafiche</h1>
          <p className="text-gray-600 mt-1">Gestione completa dei partner, artisti e etichette titolari di diritti</p>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/anagrafiche/nuova')}
        >
          <Plus className="w-4 h-4" />
          <span>Nuova Anagrafica</span>
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
                placeholder="Cerca per nome o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tutti">Tutti gli stati</option>
              <option value="Attivo">Attivo</option>
              <option value="In Scadenza">In Scadenza</option>
              <option value="Scaduto">Scaduto</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabella Anagrafiche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contatto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Contratto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scadenza
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
              {filteredAnagrafiche.map((anagrafica) => (
                <tr key={anagrafica.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{anagrafica.nome}</div>
                        <div className="text-sm text-gray-500">ID: {anagrafica.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {anagrafica.contatto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {anagrafica.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {anagrafica.telefono}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getContractTypeColor(anagrafica.tipoContratto)}`}>
                      {anagrafica.tipoContratto}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(anagrafica.scadenzaContratto).toLocaleDateString('it-IT')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(anagrafica.stato)}`}>
                      {anagrafica.stato}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{anagrafica.royalties.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction('visualizza', anagrafica.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Visualizza scheda"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('modifica', anagrafica.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Modifica"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('invia-accessi', anagrafica.id)}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded"
                        title="Invia accessi"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('contrassegna-obsoleto', anagrafica.id)}
                        className="text-orange-600 hover:text-orange-900 p-1 rounded"
                        title="Contrassegna obsoleto"
                      >
                        <Archive className="w-4 h-4" />
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totali Anagrafiche</p>
              <p className="text-2xl font-bold text-gray-900">{anagraficheData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contratti Attivi</p>
              <p className="text-2xl font-bold text-gray-900">
                {anagraficheData.filter(a => a.stato === 'Attivo').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Scadenza</p>
              <p className="text-2xl font-bold text-gray-900">
                {anagraficheData.filter(a => a.stato === 'In Scadenza').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scaduti</p>
              <p className="text-2xl font-bold text-gray-900">
                {anagraficheData.filter(a => a.stato === 'Scaduto').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anagrafiche; 