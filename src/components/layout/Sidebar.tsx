import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Home, 
  BarChart3, 
  Wallet, 
  Settings, 
  Users, 
  FileText,
  Menu,
  X,
  UserCheck,
  Music,
  Download,
  Upload,
  FileSpreadsheet,
  CreditCard,
  Receipt,
  Users2,
  MessageSquare,
  User,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/anagrafiche', icon: UserCheck, label: 'Anagrafiche' },
    { path: '/catalogo', icon: Music, label: 'Catalogo' },
    { path: '/ingestion', icon: Download, label: 'Ingestion' },
    { path: '/import-royalties', icon: Upload, label: 'Import Royalties' },
    { path: '/generazione-rendiconti', icon: FileSpreadsheet, label: 'Generazione Rendiconti' },
    { path: '/pagamenti', icon: CreditCard, label: 'Pagamenti' },
    { path: '/estratti-conto', icon: Receipt, label: 'Estratti Conto' },
    { path: '/gruppi', icon: Users2, label: 'Gruppi' },
    { path: '/news', icon: MessageSquare, label: 'News & Comunicazioni' },
    { path: '/accesso-artista', icon: User, label: 'Accesso Artista' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/transactions', icon: Wallet, label: 'Transazioni' },
    { path: '/users', icon: Users, label: 'Utenti' },
    { path: '/reports', icon: FileText, label: 'Report' },
    { path: '/settings', icon: Settings, label: 'Impostazioni' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Unda Royalties</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={isDarkMode ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-700 dark:border-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 