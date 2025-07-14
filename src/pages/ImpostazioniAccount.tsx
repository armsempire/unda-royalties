import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { VERSION } from '../version';

const STORAGE_KEY = 'unda-profile';
const NOTIF_KEY = 'unda-notifiche';
const LANG_KEY = 'unda-lang';

const getInitialProfile = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {
        nome: 'Admin',
        cognome: 'User',
        avatar: null,
        telefono: '',
        bio: '',
        createdAt: '2024-06-01',
      };
    }
  }
  return {
    nome: 'Admin',
    cognome: 'User',
    avatar: null,
    telefono: '',
    bio: '',
    createdAt: '2024-06-01',
  };
};

const getInitialNotifiche = () => {
  const stored = localStorage.getItem(NOTIF_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { email: true, push: false, sms: false };
    }
  }
  return { email: true, push: false, sms: false };
};

const getInitialLang = () => {
  return localStorage.getItem(LANG_KEY) || 'it';
};

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return 'auto';
};

const ImpostazioniAccount: React.FC = () => {
  const [tab, setTab] = useState<'utente' | 'sistema'>('utente');
  const [profile, setProfile] = useState(getInitialProfile());
  const [notifiche, setNotifiche] = useState(getInitialNotifiche());
  const [success, setSuccess] = useState<string | false>(false);
  const { isDarkMode, theme, setTheme } = useTheme();
  const [language, setLanguage] = useState(getInitialLang());

  // Gestione tema globale
  useEffect(() => {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark !== isDarkMode) setTheme(prefersDark ? 'dark' : 'light');
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    } else {
      if ((theme === 'dark' && !isDarkMode) || (theme === 'light' && isDarkMode)) setTheme(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Gestione lingua globale (mock)
  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  // Gestione notifiche
  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifiche));
  }, [notifiche]);

  // Gestione profilo
  useEffect(() => {
    const syncProfile = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProfile(JSON.parse(stored));
        } catch {}
      }
    };
    window.addEventListener('storage', syncProfile);
    return () => window.removeEventListener('storage', syncProfile);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfile(prev => ({ ...prev, avatar: url }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSuccess('Profilo aggiornato!');
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleNotificaChange = (key: 'email' | 'push' | 'sms') => {
    setNotifiche(prev => ({ ...prev, [key]: !prev[key] }));
    setSuccess('Preferenze notifiche aggiornate!');
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    setSuccess('Tema aggiornato!');
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    setSuccess('Lingua aggiornata!');
    setTimeout(() => setSuccess(false), 2000);
  };

  // Mock backup
  const handleBackup = () => {
    setSuccess('Backup completato!');
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="mx-auto mt-10 max-w-[1168px] bg-white dark:bg-[#181A20] rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Impostazioni</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Configurazione del sistema e preferenze</p>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`px-6 py-2 font-medium text-sm focus:outline-none transition-colors ${tab === 'utente' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
          onClick={() => setTab('utente')}
        >
          Utente
        </button>
        <button
          className={`px-6 py-2 font-medium text-sm focus:outline-none transition-colors ${tab === 'sistema' ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
          onClick={() => setTab('sistema')}
        >
          Sistema
        </button>
      </div>
      {success && (
        <div className="mb-4 text-green-600 dark:text-green-400 font-medium">{success}</div>
      )}
      {tab === 'utente' && (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-gray-500 dark:text-gray-300">
                  {profile.nome.charAt(0)}{profile.cognome.charAt(0)}
                </span>
              )}
            </div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              Cambia avatar
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                value={profile.nome}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cognome</label>
              <input
                type="text"
                name="cognome"
                value={profile.cognome}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefono</label>
              <input
                type="tel"
                name="telefono"
                value={profile.telefono}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Inserisci il numero di telefono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Scrivi una breve biografia..."
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tema</label>
              <select
                name="theme"
                value={theme}
                onChange={handleThemeChange}
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="auto">Automatico</option>
                <option value="light">Chiaro</option>
                <option value="dark">Scuro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lingua</label>
              <select
                name="language"
                value={language}
                onChange={handleLanguageChange}
                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="it">Italiano</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data creazione account</label>
              <input
                type="text"
                value={profile.createdAt}
                disabled
                className="w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-3 py-2 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="md:col-span-2 mt-8 flex items-center gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary-700 transition-colors"
            >
              Salva modifiche
            </button>
          </div>
        </form>
      )}
      {tab === 'sistema' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Notifiche</h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={notifiche.email} onChange={() => handleNotificaChange('email')} />
                  Notifiche Email
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={notifiche.push} onChange={() => handleNotificaChange('push')} />
                  Notifiche Push
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={notifiche.sms} onChange={() => handleNotificaChange('sms')} />
                  Notifiche SMS
                </label>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Sicurezza</h2>
              <div className="flex flex-col gap-2">
                <button className="text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" type="button" onClick={() => setSuccess('Funzionalità mock: cambia password!')}>Cambia Password</button>
                <button className="text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" type="button" onClick={() => setSuccess('Funzionalità mock: 2FA!')}>Autenticazione a Due Fattori</button>
                <button className="text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" type="button" onClick={() => setSuccess('Funzionalità mock: sessione attiva!')}>Sessione Attiva</button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Aspetto</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tema</label>
                <select value={theme} onChange={handleThemeChange} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2">
                  <option value="auto">Automatico</option>
                  <option value="light">Chiaro</option>
                  <option value="dark">Scuro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lingua</label>
                <select value={language} onChange={handleLanguageChange} className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2">
                  <option value="it">Italiano</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Sistema</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Versione</span>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">{VERSION}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Ultimo Backup</span>
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">Completato</span>
                </div>
                <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-200 mt-4" onClick={handleBackup}>Backup Manuale</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpostazioniAccount; 