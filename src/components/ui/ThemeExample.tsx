import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { themeClasses } from '../../utils/themeClasses';
import { Sun, Moon, Settings, User, Bell } from 'lucide-react';

const ThemeExample: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const classes = themeClasses;

  return (
    <div className="space-y-6">
      {/* Header con toggle tema */}
      <div className={`${classes.card} flex items-center justify-between`}>
        <div>
          <h2 className={classes.title}>Esempio Tema Scuro</h2>
          <p className={classes.body}>Questo componente mostra come utilizzare le classi del tema scuro</p>
        </div>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title={isDarkMode ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
        </button>
      </div>

      {/* Esempi di componenti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form di esempio */}
        <div className={classes.card}>
          <h3 className={classes.subtitle}>Form di Esempio</h3>
          <div className="space-y-4 mt-4">
            <div>
              <label className={classes.label}>Nome</label>
              <input
                type="text"
                placeholder="Inserisci il nome"
                className={`${classes.input} mt-1`}
              />
            </div>
            <div>
              <label className={classes.label}>Email</label>
              <input
                type="email"
                placeholder="Inserisci l'email"
                className={`${classes.input} mt-1`}
              />
            </div>
            <div>
              <label className={classes.label}>Categoria</label>
              <select className={`${classes.select} mt-1`}>
                <option>Seleziona categoria</option>
                <option>Artista</option>
                <option>Produttore</option>
                <option>Label</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button className={classes.buttonPrimary}>
                Salva
              </button>
              <button className={classes.buttonSecondary}>
                Annulla
              </button>
            </div>
          </div>
        </div>

        {/* Tabella di esempio */}
        <div className={classes.card}>
          <h3 className={classes.subtitle}>Tabella di Esempio</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead className={classes.tableHeader}>
                <tr>
                  <th className={`${classes.tableCell} text-left`}>Nome</th>
                  <th className={`${classes.tableCell} text-left`}>Stato</th>
                  <th className={`${classes.tableCell} text-left`}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                <tr className={classes.tableRow}>
                  <td className={classes.tableCell}>Mario Rossi</td>
                  <td className={classes.tableCell}>
                    <span className={`${classes.success} px-2 py-1 rounded-full text-xs`}>
                      Attivo
                    </span>
                  </td>
                  <td className={classes.tableCell}>
                    <button className={`${classes.icon} hover:${classes.iconActive} mr-2`}>
                      <User size={16} />
                    </button>
                    <button className={`${classes.icon} hover:${classes.iconActive}`}>
                      <Settings size={16} />
                    </button>
                  </td>
                </tr>
                <tr className={classes.tableRow}>
                  <td className={classes.tableCell}>Giulia Bianchi</td>
                  <td className={classes.tableCell}>
                    <span className={`${classes.warning} px-2 py-1 rounded-full text-xs`}>
                      In attesa
                    </span>
                  </td>
                  <td className={classes.tableCell}>
                    <button className={`${classes.icon} hover:${classes.iconActive} mr-2`}>
                      <User size={16} />
                    </button>
                    <button className={`${classes.icon} hover:${classes.iconActive}`}>
                      <Settings size={16} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stati di esempio */}
      <div className={classes.card}>
        <h3 className={classes.subtitle}>Stati di Esempio</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className={`${classes.success} p-4 rounded-lg`}>
            <div className="flex items-center">
              <Bell size={20} className="mr-2" />
              <span>Successo</span>
            </div>
          </div>
          <div className={`${classes.warning} p-4 rounded-lg`}>
            <div className="flex items-center">
              <Bell size={20} className="mr-2" />
              <span>Attenzione</span>
            </div>
          </div>
          <div className={`${classes.error} p-4 rounded-lg`}>
            <div className="flex items-center">
              <Bell size={20} className="mr-2" />
              <span>Errore</span>
            </div>
          </div>
          <div className={`${classes.info} p-4 rounded-lg`}>
            <div className="flex items-center">
              <Bell size={20} className="mr-2" />
              <span>Informazione</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeExample; 