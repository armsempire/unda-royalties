# 🎯 TASK LIST - UNDA ROYALTIES PLATFORM

## 📊 1. DASHBOARD ADMIN
- [x] Layout base e struttura
- [x] Grafico royalties distribuite ultimi 12 mesi (line/bar chart)
- [x] Box KPI: Royalties totali pagate
- [x] Box KPI: Numero artisti attivi  
- [x] Box KPI: Contratti in scadenza
- [x] Box KPI: Rendiconti generati
- [x] Blocco News (ultimi aggiornamenti interni)
- [x] Notifiche di sistema (errori importazione, nuove ingestion, contratti scaduti)
- [x] Collegamenti rapidi: Carica nuovo file royalties
- [x] Collegamenti rapidi: Aggiungi nuovo artista/partner
- [x] Collegamenti rapidi: Vai a generazione rendiconto

## 👥 2. ANAGRAFICHE (AVENTI DIRITTO)
### 2a) Elenco Anagrafiche
- [x] Tabella con: Nome, Contatto principale, Email, Telefono, Tipo contratto, Scadenza contratto
- [x] Azioni: Visualizza scheda, Modifica, Invia accessi, Contrassegna obsoleto

### 2b) Scheda Anagrafica
- [x] Tab: Dati generali (nome, CF/P.IVA, sede legale)
- [x] Tab: Contatti (email, tel, referente primario e secondario)
- [x] Tab: Dati bancari (IBAN, SWIFT, valuta)
- [x] Tab: Canali di distribuzione (Spotify, YouTube)
- [x] Tab: Contratti attivi (fisso/soglia, durata, PDF allegati, soglia pagamento)
- [x] Tab: Periodicità rendicontazione (mensile, trimestrale, ecc.)

## 🎵 3. CATALOGO
### 3a) Il Mio Catalogo
- [x] Lista con: Cover release, Tipo, Titolo, Data creazione/modifica, Aventi diritto associati, Stato
- [x] Azioni: Aggiungi release, Visualizza dettagli, Elimina (solo se non rendicontata)

### 3b) Dettaglio Release
- [x] Tab: Dettagli (titolo, artista, label, ISRC, UPC, Apple ID, tipo, numero tracce)
- [x] Tab: Contratti (tipo contratto, percentuali, modalità, applicabilità per store/paese)
- [x] Tab: Tracce (per album/compilation)
- [x] Tab: Associazioni ISRC/UPC

### 3c) Aggiungi Release
- [x] Importazione automatica da Spotify
- [x] Importazione automatica da YouTube
- [x] Inserimento manuale con tutti i campi
- [x] Upload cover release
- [x] Selezione multipla per importazione batch

## 📥 4. INGESTION
- [x] Tabella con: Fonte (Spotify/YouTube), Titolo release, Data rilevamento, Stato
- [x] Azioni: Visualizza dettaglio, Importa nel catalogo, Elimina/Ignora

## 📁 5. IMPORT ROYALTIES (CSV/XLS)
- [x] Upload file (CSV/XLS/XLSX)
- [x] Mappatura colonne (ISRC, importi, store, valuta, tasso di cambio)
- [x] Importazione automatica con riconoscimento release
- [x] Correzione manuale per release non riconosciute
- [x] Campi Extra: Percentuale da distribuire, Mese/anno riferimento, Valuta e tasso cambio, Identificativo file

## 📋 6. GENERAZIONE RENDICONTI
- [x] Selezione periodo (mese/trimestre/semestre/anno)
- [x] Selezione anagrafiche
- [x] Visualizza anteprima rendiconto
- [x] Conferma generazione
- [x] Genera file CSV per artista
- [x] Invia file via email

## 💰 7. PAGAMENTI
### 7a) Pagamenti da Evadere
- [ ] Elenco pagamenti da fare
- [ ] Azioni: emetti pagamento, modifica, allega fattura

### 7b) Pagamenti Evasi
- [ ] Storico pagamenti con: Data, Importo, Contratto riferimento, Fattura allegata

### 7c) Crea Pagamento Manuale
- [ ] Selezione anagrafica + contratto
- [ ] Importo + periodo
- [ ] Correzioni (extra cachet)
- [ ] File allegati (conferma bonifico)

## 📊 8. ESTRATTI CONTO
- [ ] Saldo attuale
- [ ] Grafico storico royalties 3 anni
- [ ] Ultimi pagamenti ricevuti
- [ ] Dettaglio condizioni contrattuali
- [ ] Esporta file XLS

## 👥 9. GRUPPI
- [ ] Nome gruppo
- [ ] Capogruppo
- [ ] Membri
- [ ] Stato rendicontazione

## 📢 10. NEWS & COMUNICAZIONI
- [ ] Crea news (titolo, testo, data)
- [ ] Modifica/Elimina news
- [ ] Invio automatico o manuale

## 🎨 11. ACCESSO ARTISTA (MINI DASHBOARD)
- [ ] Dashboard personale con grafico royalties
- [ ] Ultimi pagamenti ricevuti
- [ ] Download rendiconti (PDF/CSV)
- [ ] News ricevute
- [ ] Contratti attivi (sola lettura)

---

## 🛠️ TECNICAL TASKS
- [x] Setup React/Vite/Tailwind 3.x
- [x] Layout responsive con sidebar animata
- [x] Routing e struttura pagine
- [x] **Tema scuro/chiaro con toggle**
- [ ] Integrazione libreria grafici (recharts/chart.js)
- [ ] Gestione stato globale (Context/Redux)
- [ ] Mock API services
- [ ] Form validation
- [ ] File upload handling
- [ ] Export CSV/XLS functionality
- [ ] Email integration
- [ ] Authentication system

---

## 📈 PROGRESSO TOTALE: 41/91 tasks completate (45%) 