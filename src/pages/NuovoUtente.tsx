import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Key, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NuovoUtente: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [ruolo, setRuolo] = useState('Admin');
  const [password, setPassword] = useState('');
  const [stato, setStato] = useState('Attivo');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!nome.trim() || !email.trim() || !password.trim()) {
      setError('Compila tutti i campi obbligatori.');
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      navigate('/users');
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            onClick={() => navigate('/users')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna agli utenti</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nuovo Utente</h1>
            <p className="text-gray-600">Crea un nuovo utente del sistema</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-xl mx-auto space-y-6">
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Utente creato con successo!</span>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nome e cognome"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@esempio.com"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ruolo</label>
          <select
            value={ruolo}
            onChange={e => setRuolo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Artista">Artista</option>
            <option value="Contabile">Contabile</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Password temporanea"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stato</label>
          <select
            value={stato}
            onChange={e => setStato(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Attivo">Attivo</option>
            <option value="Disabilitato">Disabilitato</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={success}
          >
            Salva Utente
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuovoUtente; 