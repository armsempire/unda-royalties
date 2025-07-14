import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'unda-profile';

const ProfiloPersonale: React.FC = () => {
  // Carica dati da localStorage (mock persistente)
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

  const [profile, setProfile] = useState(getInitialProfile());
  const [success, setSuccess] = useState(false);

  const email = 'admin@undaroyalties.com';
  const ruolo = 'Admin';

  useEffect(() => {
    // Aggiorna i dati se cambia localStorage da altre tab
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="mx-auto mt-10 max-w-[1168px] bg-white dark:bg-[#181A20] rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profilo personale</h1>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-3 py-2 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ruolo</label>
            <input
              type="text"
              value={ruolo}
              disabled
              className="w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-3 py-2 text-gray-500 dark:text-gray-400 cursor-not-allowed"
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
          {success && (
            <span className="text-green-600 dark:text-green-400 font-medium">Modifiche salvate!</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfiloPersonale; 