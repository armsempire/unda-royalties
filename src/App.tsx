import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Anagrafiche from './pages/Anagrafiche';
import Catalogo from './pages/Catalogo';
import DettaglioRelease from './pages/DettaglioRelease';
import AggiungiRelease from './pages/AggiungiRelease';
import Ingestion from './pages/Ingestion';
import ImportRoyalties from './pages/ImportRoyalties';
import GenerazioneRendiconti from './pages/GenerazioneRendiconti';
import Pagamenti from './pages/Pagamenti';
import EstrattiConto from './pages/EstrattiConto';
import Gruppi from './pages/Gruppi';
import News from './pages/News';
import AccessoArtista from './pages/AccessoArtista';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NuovoGruppo from './pages/NuovoGruppo';
import NuovoUtente from './pages/NuovoUtente';
import ProfiloPersonale from './pages/ProfiloPersonale';
import ImpostazioniAccount from './pages/ImpostazioniAccount';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="anagrafiche" element={<Anagrafiche />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="catalogo/release/:id" element={<DettaglioRelease />} />
            <Route path="catalogo/aggiungi" element={<AggiungiRelease />} />
            <Route path="ingestion" element={<Ingestion />} />
            <Route path="import-royalties" element={<ImportRoyalties />} />
            <Route path="generazione-rendiconti" element={<GenerazioneRendiconti />} />
            <Route path="pagamenti" element={<Pagamenti />} />
            <Route path="estratti-conto" element={<EstrattiConto />} />
            <Route path="gruppi" element={<Gruppi />} />
            <Route path="gruppi/nuovo" element={<NuovoGruppo />} />
            <Route path="news" element={<News />} />
            <Route path="accesso-artista" element={<AccessoArtista />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="users" element={<Users />} />
            <Route path="users/nuovo" element={<NuovoUtente />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/profilo" element={<ProfiloPersonale />} />
            <Route path="/impostazioni" element={<ImpostazioniAccount />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
