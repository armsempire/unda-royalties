import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Users, 
  Eye, 
  Download, 
  Mail, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Settings,
  Filter,
  Search,
  Plus,
  Trash2,
  DollarSign,
  TrendingUp,
  BarChart3
} from 'lucide-react';

// Dati mock per le anagrafiche
const anagraficheData = [
  { id: 1, nome: 'Mario Rossi', email: 'mario.rossi@email.com', royalties: 125000, stato: 'Attivo' },
  { id: 2, nome: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', royalties: 89000, stato: 'Attivo' },
  { id: 3, nome: 'Luca Verdi', email: 'luca.verdi@email.com', royalties: 156000, stato: 'Attivo' },
  { id: 4, nome: 'Anna Neri', email: 'anna.neri@email.com', royalties: 67000, stato: 'Attivo' },
  { id: 5, nome: 'Marco Gialli', email: 'marco.gialli@email.com', royalties: 234000, stato: 'Attivo' }
];

// Dati mock per l'anteprima rendiconto
const previewRendiconto = {
  periodo: 'Gennaio 2024',
  anagrafiche: 5,
  royaltiesTotali: 671000,
  royaltiesDistribuite: 570350,
  percentualeDistribuzione: 85,
  dettagli: [
    {
      id: 1,
      anagrafica: 'Mario Rossi',
      royalties: 125000,
      distribuite: 106250,
      percentuale: 15,
      release: 12,
      store: ['Spotify', 'YouTube', 'Apple Music']
    },
    {
      id: 2,
      anagrafica: 'Giulia Bianchi',
      royalties: 89000,
      distribuite: 75650,
      percentuale: 12,
      release: 8,
      store: ['Spotify', 'YouTube']
    },
    {
      id: 3,
      anagrafica: 'Luca Verdi',
      royalties: 156000,
      distribuite: 132600,
      percentuale: 18,
      release: 15,
      store: ['Spotify', 'YouTube', 'Amazon Music']
    },
    {
      id: 4,
      anagrafica: 'Anna Neri',
      royalties: 67000,
      distribuite: 56950,
      percentuale: 8,
      release: 5,
      store: ['Spotify', 'YouTube']
    },
    {
      id: 5,
      anagrafica: 'Marco Gialli',
      royalties: 234000,
      distribuite: 198900,
      percentuale: 25,
      release: 20,
      store: ['Spotify', 'YouTube', 'Apple Music', 'Amazon Music']
    }
  ]
};

const GenerazioneRendiconti: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');
  const [selectedAnagrafiche, setSelectedAnagrafiche] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);

  const steps = [
    { id: 1, title: 'Selezione Periodo', icon: Calendar },
    { id: 2, title: 'Selezione Anagrafiche', icon: Users },
    { id: 3, title: 'Anteprima Rendiconto', icon: Eye },
    { id: 4, title: 'Generazione File', icon: Download }
  ];

  const periods = [
    { value: '2024-01', label: 'Gennaio 2024' },
    { value: '2024-02', label: 'Febbraio 2024' },
    { value: '2024-03', label: 'Marzo 2024' },
    { value: '2024-Q1', label: 'Q1 2024' },
    { value: '2024-Q2', label: 'Q2 2024' },
    { value: '2024-Q3', label: 'Q3 2024' },
    { value: '2024-Q4', label: 'Q4 2024' },
    { value: '2024', label: 'Anno 2024' }
  ];

  const handleAnagraficaToggle = (id: number) => {
    setSelectedAnagrafiche(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedAnagrafiche(anagraficheData.map(a => a.id));
  };

  const handleDeselectAll = () => {
    setSelectedAnagrafiche([]);
  };

  const handleGeneratePreview = () => {
    setShowPreview(true);
    setCurrentStep(3);
  };

  const handleGenerateFiles = () => {
    const files = selectedAnagrafiche.map(id => {
      const anagrafica = anagraficheData.find(a => a.id === id);
      return `rendiconto_${anagrafica?.nome.replace(' ', '_')}_${selectedPeriod}.csv`;
    });
    setGeneratedFiles(files);
    setCurrentStep(4);
  };

  const renderPeriodSelection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Selezione Periodo</h3>
        <p className="text-gray-600 mb-6">
          Seleziona il periodo per cui generare i rendiconti
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                selectedPeriod === period.value
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{period.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setCurrentStep(2)}
          disabled={!selectedPeriod}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continua
        </button>
      </div>
    </div>
  );

  const renderAnagraficheSelection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Selezione Anagrafiche</h3>
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
          {anagraficheData.map((anagrafica) => (
            <div
              key={anagrafica.id}
              className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                selectedAnagrafiche.includes(anagrafica.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleAnagraficaToggle(anagrafica.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedAnagrafiche.includes(anagrafica.id)}
                    onChange={() => handleAnagraficaToggle(anagrafica.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{anagrafica.nome}</div>
                    <div className="text-sm text-gray-500">{anagrafica.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">€{anagrafica.royalties.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{anagrafica.stato}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {selectedAnagrafiche.length} anagrafiche selezionate
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentStep(1)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Indietro
          </button>
          <button
            onClick={handleGeneratePreview}
            disabled={selectedAnagrafiche.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Genera Anteprima
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Anteprima Rendiconto</h3>
        <p className="text-gray-600 mb-6">
          Rivedi i dati prima della generazione dei file
        </p>
        
        {/* Riepilogo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{previewRendiconto.anagrafiche}</div>
            <div className="text-sm text-gray-600">Anagrafiche</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">€{previewRendiconto.royaltiesTotali.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Royalties Totali</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">€{previewRendiconto.royaltiesDistribuite.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Distribuite</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{previewRendiconto.percentualeDistribuzione}%</div>
            <div className="text-sm text-gray-600">Percentuale</div>
          </div>
        </div>

        {/* Dettagli */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Anagrafica</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Royalties</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Distribuite</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentuale</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Release</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Store</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {previewRendiconto.dettagli.map((dettaglio) => (
                <tr key={dettaglio.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{dettaglio.anagrafica}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">€{dettaglio.royalties.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">€{dettaglio.distribuite.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{dettaglio.percentuale}%</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{dettaglio.release}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{dettaglio.store.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Periodo: {periods.find(p => p.value === selectedPeriod)?.label}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentStep(2)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Indietro
          </button>
          <button
            onClick={handleGenerateFiles}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Conferma Generazione
          </button>
        </div>
      </div>
    </div>
  );

  const renderFileGeneration = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-green-900">File Generati con Successo</h3>
            <p className="text-green-700 mt-1">
              {generatedFiles.length} file CSV sono stati generati e sono pronti per il download.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">File Generati</h3>
        <div className="space-y-3">
          {generatedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{file}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Download className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-900">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Azioni Rapide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <Download className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Scarica Tutti i File</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <Mail className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">Invia Tutti via Email</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Nuovo Rendiconto</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-3">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nuovo Rendiconto
        </button>
        <button
          onClick={() => console.log('Vai a pagamenti')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Vai a Pagamenti
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPeriodSelection();
      case 2:
        return renderAnagraficheSelection();
      case 3:
        return renderPreview();
      case 4:
        return renderFileGeneration();
      default:
        return renderPeriodSelection();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generazione Rendiconti</h1>
          <p className="text-gray-600 mt-1">Generazione automatica o provvisoria di rendiconti per artisti e partner</p>
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

export default GenerazioneRendiconti; 