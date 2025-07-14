// Classi comuni per il tema scuro
export const themeClasses = {
  // Container principali
  container: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  card: 'bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
  
  // Testi
  title: 'text-2xl font-bold text-gray-900 dark:text-white',
  subtitle: 'text-lg font-medium text-gray-900 dark:text-white',
  body: 'text-sm text-gray-600 dark:text-gray-400',
  label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
  
  // Input
  input: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400',
  select: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
  
  // Bottoni
  buttonPrimary: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors',
  buttonSecondary: 'px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
  
  // Tabelle
  tableHeader: 'bg-gray-50 dark:bg-gray-700',
  tableRow: 'hover:bg-gray-50 dark:hover:bg-gray-700',
  tableCell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white',
  
  // Stati
  success: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
  warning: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400',
  error: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
  info: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400',
  
  // Icone
  icon: 'text-gray-600 dark:text-gray-300',
  iconActive: 'text-blue-600 dark:text-blue-400',
  
  // Hover states
  hover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
  hoverText: 'hover:text-gray-900 dark:hover:text-white',
};

// Hook personalizzato per il tema
export const useThemeClasses = () => {
  return themeClasses;
}; 