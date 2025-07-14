import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  MapPin, 
  Settings, 
  Play, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Calendar,
  DollarSign,
  Globe,
  Hash,
  Music
} from 'lucide-react';

// Dati mock per la mappatura colonne
const columnMapping = {
  isrc: 'ISRC',
  importi: 'Importi',
  store: 'Store',
  valuta: 'Valuta',
  tassoCambio: 'Tasso di Cambio'
};

// Dati mock per l'anteprima importazione
const previewData = [
  {
    id: 1,
    isrc: 'IT-ABC-24-00001',
    titolo: 'Summer Vibes',
    artista: 'Mario Rossi',
    importo: 1250.50,
    store: 'Spotify',
    valuta: 'EUR',
    tassoCambio: 1.0,
    riconosciuto: true,
    releaseAssociata: 'Summer Vibes - Mario Rossi'
  },
  {
    id: 2,
    isrc: 'IT-ABC-24-00002',
    titolo: 'Electric Dreams',
    artista: 'Giulia Bianchi',
    importo: 890.75,
    store: 'YouTube',
    valuta: 'USD',
    tassoCambio: 0.85,
    riconosciuto: true,
    releaseAssociata: 'Electric Dreams - Giulia Bianchi'
  },
  {
    id: 3,
    isrc: 'IT-ABC-24-00003',
    titolo: 'Unknown Track',
    artista: 'Unknown Artist',
    importo: 450.00,
    store: 'Apple Music',
    valuta: 'EUR',
    tassoCambio: 1.0,
    riconosciuto: false,
    releaseAssociata: null
  }
];

const ImportRoyalties: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<any[]>([]);
  const [mapping, setMapping] = useState(columnMapping);
  const [percentualeDistribuzione, setPercentualeDistribuzione] = useState(85);
  const [meseRiferimento, setMeseRiferimento] = useState('2024-01');
  const [valuta, setValuta] = useState('EUR');
  const [tassoCambio, setTassoCambio] = useState(1.0);
  const [identificativoFile, setIdentificativoFile] = useState('');
  const [commento, setCommento] = useState('');

  const steps = [
    { id: 1, title: 'Upload File', icon: Upload },
    { id: 2, title: 'Mappatura Colonne', icon: MapPin },
    { id: 3, title: 'Anteprima Importazione', icon: Eye },
    { id: 4, title: 'Conferma Importazione', icon: CheckCircle }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simula la lettura del file CSV
      setFilePreview([
        { ISRC: 'IT-ABC-24-00001', Importi: '1250.50', Store: 'Spotify', Valuta: 'EUR', 'Tasso di Cambio': '1.0' },
        { ISRC: 'IT-ABC-24-00002', Importi: '890.75', Store: 'YouTube', Valuta: 'USD', 'Tasso di Cambio': '0.85' },
        { ISRC: 'IT-ABC-24-00003', Importi: '450.00', Store: 'Apple Music', Valuta: 'EUR', 'Tasso di Cambio': '1.0' }
      ]);
      setCurrentStep(2);
    }
  };

  const handleMappingChange = (field: string, value: string) => {
    setMapping(prev => ({ ...prev, [field]: value }));
  };

  const handleImport = () => {
    console.log('Importazione avviata');
    setCurrentStep(4);
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Carica File Royalties</h3>
          <p className="text-gray-600 mb-6">
            Seleziona un file CSV, XLS o XLSX contenente i dati delle royalties
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Clicca per selezionare</span> o trascina qui
                </p>
                <p className="text-xs text-gray-500 mt-1">CSV, XLS, XLSX (max 10MB)</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Campi Extra */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Campi Extra</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Percentuale da Distribuire (%)
            </label>
            <input
              type="number"
              value={percentualeDistribuzione}
              onChange={(e) => setPercentualeDistribuzione(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
            />
            <p className="text-xs text-gray-500 mt-1">Es. trattenuta del 15% = 85%</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mese e Anno di Riferimento
            </label>
            <input
              type="month"
              value={meseRiferimento}
              onChange={(e) => setMeseRiferimento(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valuta
            </label>
            <select
              value={valuta}
              onChange={(e) => setValuta(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - Dollaro USA</option>
              <option value="GBP">GBP - Sterlina</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tasso di Cambio Manuale
            </label>
            <input
              type="number"
              value={tassoCambio}
              onChange={(e) => setTassoCambio(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.01"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Identificativo File
            </label>
            <input
              type="text"
              value={identificativoFile}
              onChange={(e) => setIdentificativoFile(e.target.value)}
              placeholder="Es. royalties_spotify_jan2024"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commento
            </label>
            <textarea
              value={commento}
              onChange={(e) => setCommento(e.target.value)}
              placeholder="Note aggiuntive..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMappingStep = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mappatura Colonne</h3>
        <p className="text-gray-600 mb-6">
          Associa le colonne del file alle proprietà del sistema
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ISRC</label>
            <select
              value={mapping.isrc}
              onChange={(e) => handleMappingChange('isrc', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ISRC">ISRC</option>
              <option value="Codice">Codice</option>
              <option value="ID">ID</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Importi</label>
            <select
              value={mapping.importi}
              onChange={(e) => handleMappingChange('importi', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Importi">Importi</option>
              <option value="Royalties">Royalties</option>
              <option value="Guadagni">Guadagni</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store</label>
            <select
              value={mapping.store}
              onChange={(e) => handleMappingChange('store', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Store">Store</option>
              <option value="Piattaforma">Piattaforma</option>
              <option value="Canale">Canale</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valuta</label>
            <select
              value={mapping.valuta}
              onChange={(e) => handleMappingChange('valuta', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Valuta">Valuta</option>
              <option value="Currency">Currency</option>
              <option value="Moneta">Moneta</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tasso di Cambio</label>
            <select
              value={mapping.tassoCambio}
              onChange={(e) => handleMappingChange('tassoCambio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tasso di Cambio">Tasso di Cambio</option>
              <option value="Exchange Rate">Exchange Rate</option>
              <option value="Rate">Rate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Anteprima File */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Anteprima File</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {Object.values(mapping).map((column, index) => (
                  <th key={index} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filePreview.slice(0, 3).map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(mapping).map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 text-gray-900">
                      {row[column] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">Mostrando le prime 3 righe del file</p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Indietro
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continua
        </button>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Anteprima Importazione</h3>
        <p className="text-gray-600 mb-6">
          Rivedi i dati prima dell'importazione. Le release non riconosciute possono essere corrette manualmente.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ISRC</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Titolo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Artista</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Importo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {previewData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{row.isrc}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{row.titolo}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{row.artista}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">€{row.importo.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{row.store}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      row.riconosciuto 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {row.riconosciuto ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Riconosciuto
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Non Riconosciuto
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      {!row.riconosciuto && (
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-green-600 hover:text-green-900">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p>• {previewData.filter(r => r.riconosciuto).length} release riconosciute automaticamente</p>
          <p>• {previewData.filter(r => !r.riconosciuto).length} release richiedono correzione manuale</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentStep(2)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Indietro
          </button>
          <button
            onClick={handleImport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Conferma Importazione
          </button>
        </div>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-green-900">Importazione Completata</h3>
            <p className="text-green-700 mt-1">
              {previewData.length} record importati con successo. 
              Le royalties sono state distribuite secondo le percentuali configurate.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Riepilogo Importazione</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{previewData.length}</div>
            <div className="text-sm text-gray-600">Record Importati</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              €{previewData.reduce((sum, row) => sum + row.importo, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Royalties Totali</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{percentualeDistribuzione}%</div>
            <div className="text-sm text-gray-600">Percentuale Distribuita</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-3">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nuova Importazione
        </button>
        <button
          onClick={() => console.log('Vai a rendiconti')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Vai a Rendiconti
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderUploadStep();
      case 2:
        return renderMappingStep();
      case 3:
        return renderPreviewStep();
      case 4:
        return renderConfirmStep();
      default:
        return renderUploadStep();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Import Royalties</h1>
          <p className="text-gray-600 mt-1">Importazione dei rendiconti da aggregatori o store tramite file</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive 
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}
    </div>
  );
};

export default ImportRoyalties; 