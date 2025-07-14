import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, Palette, Database, FileText } from 'lucide-react';
import { VERSION } from '../version';
import axios from 'axios';

const CHANGELOG = `
## [1.0.0] - 2024-07-14
### Added
- Prima release stabile della dashboard Unda Royalties.
- Sidebar animata e responsive con logo, toggle tema chiaro/scuro, tutte le sezioni principali.
- Header con barra di ricerca, notifiche interattive, profilo utente con menu.
- Tema scuro/chiaro con toggle e persistenza preferenza.
- Dashboard con KPI, grafici (mock), news e notifiche (mock), collegamenti rapidi.
- Anagrafiche: lista, filtri, ricerca, azioni, form “Nuova Anagrafica”.
- Catalogo: lista release (mock), filtri, ricerca, azioni, form “Aggiungi Release”.
- Dettaglio Release: visualizzazione dettagliata, modifica, aggiunta tracce, associazioni ISRC/UPC.
- Ingestion: lista release da importare (mock), azioni (importa, ignora, elimina).
- Import Royalties: pagina mock per importazione file.
- Generazione Rendiconti: selezione periodo, anagrafiche, anteprima, generazione file (mock).
- Pagamenti, Estratti Conto, Gruppi, News & Comunicazioni, Accesso Artista, Utenti, Report: tutte le pagine principali presenti, con dati mock e UI coerente.
- Form dedicati per “Nuovo Gruppo” e “Nuovo Utente” con validazione, feedback di successo e ritorno automatico alla lista.
- Routing completo per tutte le pagine, inclusi i form di inserimento.
- Utility per classi tema scuro/chiaro e ThemeContext per gestione tema.
- Task list aggiornata e documentazione interna coerente con il nuovo nome “Unda Royalties”.
- Email mock admin aggiornata a admin@undaroyalties.com.
- Pagina Profilo Personale con modifica dati persistente (mock).
- Pagina Impostazioni con tab Utente/Sistema, selettore tema e lingua funzionanti, notifiche e sicurezza mock.
`;

const ChangelogModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-xl">&times;</button>
        <div className="flex items-center mb-4 gap-2">
          <FileText className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Changelog</h2>
        </div>
        <div className="prose prose-sm max-h-96 overflow-y-auto dark:prose-invert">
          {CHANGELOG.split('\n').map((line, i) => (
            line.startsWith('##') ? <h3 key={i}>{line.replace('## ', '')}</h3>
            : line.startsWith('###') ? <h4 key={i}>{line.replace('### ', '')}</h4>
            : line.startsWith('- ') ? <li key={i}>{line.replace('- ', '')}</li>
            : line.trim() === '' ? <br key={i} />
            : <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const CommitModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleCommit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await axios.post('http://localhost:4000/api/release', {}, {
        headers: { 'x-release-secret': 'supersecret' }
      });
      setResult('Release, changelog e push eseguiti con successo!');
    } catch (e: any) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-xl">&times;</button>
        <div className="flex items-center mb-4 gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600"><FileText size={20} /></span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Commit automatico versione</h2>
        </div>
        <p className="mb-4 text-gray-700 dark:text-gray-300">Clicca il pulsante qui sotto per aggiornare versione, changelog e fare il push automatico:</p>
        <button
          className="w-full px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 mb-4 disabled:opacity-60"
          onClick={handleCommit}
          disabled={loading}
        >
          {loading ? 'Esecuzione in corso...' : 'Esegui Commit & Release'}
        </button>
        {result && <div className="text-green-600 font-medium mb-2">{result}</div>}
        {error && <div className="text-red-600 font-medium mb-2">Errore: {error}</div>}
        <p className="text-xs text-gray-500 dark:text-gray-400">L’operazione aggiornerà la versione, il changelog e farà il push automatico.</p>
      </div>
    </div>
  );
};

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('it');
  const [showChangelog, setShowChangelog] = useState(false);
  const [showCommit, setShowCommit] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Impostazioni</h1>
        <p className="text-gray-600 mt-2">Configurazione del sistema e preferenze</p>
      </div>

      {/* Settings sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Bell className="text-blue-500 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">Notifiche</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Notifiche Email</p>
                <p className="text-xs text-gray-500">Ricevi notifiche via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Notifiche Push</p>
                <p className="text-xs text-gray-500">Notifiche in tempo reale</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Notifiche SMS</p>
                <p className="text-xs text-gray-500">Notifiche via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Palette className="text-purple-500 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">Aspetto</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tema
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Chiaro</option>
                <option value="dark">Scuro</option>
                <option value="auto">Automatico</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lingua
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="it">Italiano</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Shield className="text-green-500 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">Sicurezza</h2>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">Cambia Password</p>
              <p className="text-xs text-gray-500">Aggiorna la tua password</p>
            </button>
            
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">Autenticazione a Due Fattori</p>
              <p className="text-xs text-gray-500">Configura 2FA per maggiore sicurezza</p>
            </button>
            
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">Sessione Attiva</p>
              <p className="text-xs text-gray-500">Gestisci le sessioni attive</p>
            </button>
          </div>
        </div>

        {/* System */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Database className="text-orange-500 mr-3" size={24} />
            <h2 className="text-lg font-semibold text-gray-900">Sistema</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Versione</p>
                <p className="text-xs text-gray-500">v{VERSION}</p>
                <button
                  className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  type="button"
                  onClick={() => setShowChangelog(true)}
                >
                  <FileText size={14} /> Changelog
                </button>
                <button
                  className="mt-2 ml-2 flex items-center gap-1 text-xs text-green-600 hover:underline"
                  type="button"
                  onClick={() => setShowCommit(true)}
                >
                  <span className="font-bold">⎆</span> Commit
                </button>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Aggiornato
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Ultimo Backup</p>
                <p className="text-xs text-gray-500">2024-01-15 14:30</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Completato
              </span>
            </div>
            
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">Backup Manuale</p>
              <p className="text-xs text-gray-500">Esegui un backup manuale</p>
            </button>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Save size={16} />
          <span>Salva Impostazioni</span>
        </button>
      </div>
      <ChangelogModal open={showChangelog} onClose={() => setShowChangelog(false)} />
      <CommitModal open={showCommit} onClose={() => setShowCommit(false)} />
    </div>
  );
};

export default Settings; 