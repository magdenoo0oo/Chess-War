import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { GameViewerPage } from './pages/GameViewerPage';
import { WhatIfSimulatorPage } from './pages/WhatIfSimulatorPage';
import { TerritoryControlPage } from './pages/TerritoryControlPage';
import { PlayersComparisonPage } from './pages/PlayersComparisonPage';
import { BattleSimulatorPage } from './pages/BattleSimulatorPage';
import { DatabasePage } from './pages/DatabasePage';
import { HeatmapPage } from './pages/HeatmapPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="viewer" element={<GameViewerPage />} />
          <Route path="simulator" element={<WhatIfSimulatorPage />} />
          <Route path="comparison" element={<PlayersComparisonPage />} />
          <Route path="territory" element={<TerritoryControlPage />} />
          <Route path="battle" element={<BattleSimulatorPage />} />
          <Route path="database" element={<DatabasePage />} />
          <Route path="heatmap" element={<HeatmapPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;