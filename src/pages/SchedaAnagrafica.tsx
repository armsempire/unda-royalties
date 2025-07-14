import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Globe, 
  FileText, 
  Calendar,
  Download,
  Upload,
  Eye,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Dati mock per la scheda anagrafica
const anagraficaData = {
  id: 1,
  nome: 'Mario Rossi',
  codiceFiscale: 'RSSMRA80A01H501U',
  partitaIva: '12345678901',
  sedeLegale: 'Via Roma 123, 00100 Roma, Italia',
  email: 'mario.rossi@email.com',
  telefono: '+39 333 1234567',
  referentePrimario: 'Mario Rossi',
  referenteSecondario: 'Giulia Rossi',
  iban: 'IT60 X054 2811 1010 0000 0123 456',
  swift: 'UNCRIT2BXXX',
  valuta: 'EUR',
  canaliDistribuzione: [
    { nome: 'Spotify', attivo: true, percentuale: 25 },
    { nome: 'YouTube', attivo: true, percentuale: 30 },
    { nome: 'Apple Music', attivo: false, percentuale: 0 },
    { nome: 'Amazon Music', attivo: true, percentuale: 15 }
  ],
  contratti: [
    {
      id: 1,
      tipo: 'Fisso',
      durata: '24 mesi',
      scadenza: '2024-12-31',
      sogliaPagamento: 1000,
      pdfAllegato: 'contratto_mario_rossi.pdf',
      percentuale: 15
    },
    {
      id: 2,
      tipo: 'Soglia',
      durata: '12 mesi',
      scadenza: '2025-06-30',
      sogliaPagamento: 500,
      pdfAllegato: 'contratto_aggiornamento.pdf',
      percentuale: 20
    }
  ],
  periodicitaRendicontazione: 'Mensile',
  note: 'Artista principale con contratto esclusivo per il mercato italiano.'
};

const SchedaAnagrafica: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dati-generali');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'dati-generali', label: 'Dati Generali', icon: User },
    { id: 'contatti', label: 'Contatti', icon: Mail },
    { id: 'dati-bancari', label: 'Dati Bancari', icon: CreditCard },
    { id: 'canali-distribuzione', label: 'Canali di Distribuzione', icon: Globe },
    { id: 'contratti-attivi', label: 'Contratti Attivi', icon: FileText },
    { id: 'periodicita', label: 'Periodicità Rendicontazione', icon: Calendar }
  ];

  const renderDatiGenerali = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
          <input
            type="text"
            value={anagraficaData.nome}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Codice Fiscale</label>
          <input
            type="text"
            value={anagraficaData.codiceFiscale}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partita IVA</label>
          <input
            type="text"
            value={anagraficaData.partitaIva}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sede Legale</label>
          <input
            type="text"
            value={anagraficaData.sedeLegale}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
        <textarea
          value={anagraficaData.note}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderContatti = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={anagraficaData.email}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={anagraficaData.telefono}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Referente Primario</label>
          <input
            type="text"
            value={anagraficaData.referentePrimario}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Referente Secondario</label>
          <input
            type="text"
            value={anagraficaData.referenteSecondario}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderDatiBancari = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={anagraficaData.iban}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SWIFT</label>
          <input
            type="text"
            value={anagraficaData.swift}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valuta</label>
          <select
            value={anagraficaData.valuta}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - Dollaro USA</option>
            <option value="GBP">GBP - Sterlina</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCanaliDistribuzione = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Canali di Distribuzione</h3>
        {isEditing && (
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Aggiungi Canale</span>
          </button>
        )}
      </div>
      <div className="space-y-3">
        {anagraficaData.canaliDistribuzione.map((canale, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={canale.attivo}
                  disabled={!isEditing}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="font-medium text-gray-900">{canale.nome}</span>
              </div>
              <span className="text-sm text-gray-600">{canale.percentuale}%</span>
            </div>
            {isEditing && (
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContrattiAttivi = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Contratti Attivi</h3>
        {isEditing && (
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nuovo Contratto</span>
          </button>
        )}
      </div>
      <div className="space-y-4">
        {anagraficaData.contratti.map((contratto) => (
          <div key={contratto.id} className="p-6 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-gray-900">Contratto #{contratto.id}</h4>
                <p className="text-sm text-gray-600">{contratto.tipo} - {contratto.durata}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Download className="w-4 h-4" />
                </button>
                {isEditing && (
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scadenza</label>
                <p className="text-sm text-gray-900">{new Date(contratto.scadenza).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soglia Pagamento</label>
                <p className="text-sm text-gray-900">€{contratto.sogliaPagamento.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Percentuale</label>
                <p className="text-sm text-gray-900">{contratto.percentuale}%</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF Allegato</label>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{contratto.pdfAllegato}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPeriodicita = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Periodicità Rendicontazione</label>
        <select
          value={anagraficaData.periodicitaRendicontazione}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={!isEditing}
        >
          <option value="Mensile">Mensile</option>
          <option value="Trimestrale">Trimestrale</option>
          <option value="Semestrale">Semestrale</option>
          <option value="Annuale">Annuale</option>
        </select>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Rendicontazione Configurata</h4>
            <p className="text-sm text-blue-700 mt-1">
              I rendiconti vengono generati automaticamente ogni {anagraficaData.periodicitaRendicontazione.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dati-generali':
        return renderDatiGenerali();
      case 'contatti':
        return renderContatti();
      case 'dati-bancari':
        return renderDatiBancari();
      case 'canali-distribuzione':
        return renderCanaliDistribuzione();
      case 'contratti-attivi':
        return renderContrattiAttivi();
      case 'periodicita':
        return renderPeriodicita();
      default:
        return renderDatiGenerali();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span>Torna all'elenco</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{anagraficaData.nome}</h1>
            <p className="text-gray-600">Scheda anagrafica completa</p>
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

export default SchedaAnagrafica; 