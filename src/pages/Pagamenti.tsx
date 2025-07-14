import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  Edit, 
  Download, 
  Upload,
  Calendar,
  User,
  Euro,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Send,
  Filter,
  Search
} from 'lucide-react';

// Dati mock per pagamenti da evadere
const pagamentiDaEvadere = [
  {
    id: 1,
    anagrafica: 'Mario Rossi',
    contratto: 'Contratto Fisso 15%',
    importo: 1250.50,
    periodo: 'Gennaio 2024',
    scadenza: '2024-02-15',
    stato: 'In attesa',
    priorita: 'Alta'
  },
  {
    id: 2,
    anagrafica: 'Giulia Bianchi',
    contratto: 'Contratto Soglia 20%',
    importo: 890.75,
    periodo: 'Gennaio 2024',
    scadenza: '2024-02-20',
    stato: 'In attesa',
    priorita: 'Media'
  },
  {
    id: 3,
    anagrafica: 'Luca Verdi',
    contratto: 'Contratto Fisso 12%',
    importo: 2340.00,
    periodo: 'Gennaio 2024',
    scadenza: '2024-02-10',
    stato: 'In attesa',
    priorita: 'Alta'
  }
];

// Dati mock per pagamenti evasi
const pagamentiEvasi = [
  {
    id: 4,
    anagrafica: 'Anna Neri',
    contratto: 'Contratto Fisso 15%',
    importo: 1560.25,
    dataPagamento: '2024-01-15',
    metodo: 'Bonifico',
    fattura: 'FAT-2024-001',
    stato: 'Completato'
  },
  {
    id: 5,
    anagrafica: 'Marco Gialli',
    contratto: 'Contratto Soglia 18%',
    importo: 890.50,
    dataPagamento: '2024-01-10',
    metodo: 'Bonifico',
    fattura: 'FAT-2024-002',
    stato: 'Completato'
  }
];

const Pagamenti: React.FC = () => {
  const [activeTab, setActiveTab] = useState('da-evadere');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStato, setFilterStato] = useState('Tutti');

  const tabs = [
    { id: 'da-evadere', label: 'Da Evadere', icon: Clock },
    { id: 'evasi', label: 'Evasi', icon: CheckCircle },
    { id: 'crea-manuale', label: 'Crea Manuale', icon: Plus }
  ];

  const handleAction = (action: string, id: number) => {
    console.log(`${action} pagamento ${id}`);
  };

  const renderDaEvadere = () => (
    <div className="space-y-6">
      {/* Filtri */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca per anagrafica o contratto..."
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
              <option value="In attesa">In attesa</option>
              <option value="In elaborazione">In elaborazione</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista Pagamenti */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anagrafica
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contratto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periodo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scadenza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priorità
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pagamentiDaEvadere
                .filter(pagamento => 
                  pagamento.anagrafica.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  pagamento.contratto.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((pagamento) => (
                  <tr key={pagamento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{pagamento.anagrafica}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pagamento.contratto}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">€{pagamento.importo.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pagamento.periodo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {new Date(pagamento.scadenza).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        pagamento.priorita === 'Alta' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pagamento.priorita}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction('emetti', pagamento.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Emetti pagamento"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('modifica', pagamento.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('fattura', pagamento.id)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Allega fattura"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEvasi = () => (
    <div className="space-y-6">
      {/* Filtri */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cerca per anagrafica o fattura..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista Pagamenti Evasi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Pagamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anagrafica
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contratto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metodo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fattura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pagamentiEvasi
                .filter(pagamento => 
                  pagamento.anagrafica.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  pagamento.fattura.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((pagamento) => (
                  <tr key={pagamento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {new Date(pagamento.dataPagamento).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{pagamento.anagrafica}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pagamento.contratto}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">€{pagamento.importo.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{pagamento.metodo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pagamento.fattura}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction('visualizza', pagamento.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Visualizza dettagli"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('download', pagamento.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Download fattura"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('invia', pagamento.id)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Invia via email"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCreaManuale = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Crea Pagamento Manuale</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Anagrafica</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleziona anagrafica</option>
              <option value="1">Mario Rossi</option>
              <option value="2">Giulia Bianchi</option>
              <option value="3">Luca Verdi</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contratto</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleziona contratto</option>
              <option value="1">Contratto Fisso 15%</option>
              <option value="2">Contratto Soglia 20%</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Importo</label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                step="0.01"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Periodo</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="es. Gennaio 2024"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Scadenza</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correzioni</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Extra cachet, ecc."
            />
          </div>
        </div>

        {/* Upload File */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">File Allegati</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Clicca per caricare</span> o trascina qui
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF, DOC, XLS (max 10MB)</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Crea Pagamento
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'da-evadere':
        return renderDaEvadere();
      case 'evasi':
        return renderEvasi();
      case 'crea-manuale':
        return renderCreaManuale();
      default:
        return renderDaEvadere();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pagamenti</h1>
          <p className="text-gray-600 mt-1">Gestione pagamenti royalties e bonifici</p>
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

export default Pagamenti; 