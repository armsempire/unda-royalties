import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User, Search, Settings, LogOut, UserCog, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
}

const mockNotifications = [
  { id: 1, title: 'Nuovo file royalties importato', read: false, date: '2024-06-10' },
  { id: 2, title: 'Contratto in scadenza tra 7 giorni', read: false, date: '2024-06-09' },
  { id: 3, title: 'Rendiconto generato con successo', read: true, date: '2024-06-08' },
];

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Chiudi dropdown se clic fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Cerca..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifiche */}
          <div className="relative" ref={notifRef}>
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              onClick={() => setShowNotifications((v) => !v)}
            >
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              {notifications.some(n => !n.read) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white">Notifiche</span>
                  <button
                    className="text-xs text-blue-600 hover:underline"
                    onClick={handleMarkAllRead}
                    type="button"
                  >
                    Segna tutte come lette
                  </button>
                </div>
                <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.length === 0 && (
                    <li className="px-4 py-3 text-gray-500 text-sm">Nessuna notifica</li>
                  )}
                  {notifications.map((n) => (
                    <li key={n.id} className={`px-4 py-3 flex items-start space-x-2 ${n.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                      <CheckCircle className={`w-4 h-4 mt-1 ${n.read ? 'text-gray-400' : 'text-blue-600'}`} />
                      <div className="flex-1">
                        <div className={`text-sm ${n.read ? 'text-gray-700 dark:text-gray-300' : 'text-blue-900 dark:text-blue-300 font-semibold'}`}>{n.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{n.date}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Profilo utente */}
          <div className="relative" ref={profileRef}>
            <button
              className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center focus:outline-none"
              onClick={() => setShowProfile((v) => !v)}
            >
              <User size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="font-semibold text-gray-900 dark:text-white">Admin User</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">admin@undaroyalties.com</div>
                </div>
                <ul className="py-1">
                  <li>
                    <Link to="/profilo" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <UserCog className="w-4 h-4 mr-2" /> Profilo personale
                    </Link>
                  </li>
                  <li>
                    <Link to="/impostazioni" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings className="w-4 h-4 mr-2" /> Impostazioni account
                    </Link>
                  </li>
                  <li>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700" type="button">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@undaroyalties.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 