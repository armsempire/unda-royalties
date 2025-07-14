import React, { useState } from 'react';
import { ArrowLeft, User, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NuovoGruppo: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [capogruppo, setCapogruppo] = useState('');
  const [membri, setMembri] = useState<string[]>(['']);
  const [stato, setStato] = useState('Attivo');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleMembroChange = (index: number, value: string) => {
    setMembri(prev => prev.map((m, i) => (i === index ? value : m)));
  };

  const handleAddMembro = () => {
    setMembri(prev => [...prev, '']);
  };

  const handleRemoveMembro = (index: number) => {
    setMembri(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!nome.trim() || !capogruppo.trim() || membri.some(m => !m.trim())) {
      setError('Compila tutti i campi obbligatori.');
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      navigate('/gruppi');
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            onClick={() => navigate('/gruppi')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna ai gruppi</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nuovo Gruppo</h1>
            <p className="text-gray-600">Crea un nuovo gruppo musicale</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto space-y-6">
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Gruppo creato con successo!</span>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome Gruppo *</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Inserisci il nome del gruppo"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Capogruppo *</label>
          <input
            type="text"
            value={capogruppo}
            onChange={e => setCapogruppo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nome del capogruppo"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Membri *</label>
          <div className="space-y-2">
            {membri.map((membro, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={membro}
                  onChange={e => handleMembroChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Membro #${idx + 1}`}
                  required
                />
                {membri.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMembro(idx)}
                    className="text-red-600 hover:text-red-800 px-2"
                    title="Rimuovi membro"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMembro}
              className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              + Aggiungi Membro
            </button>
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
            <option value="Inattivo">Inattivo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Note aggiuntive (opzionale)"
            rows={3}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={success}
          >
            Salva Gruppo
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuovoGruppo; 