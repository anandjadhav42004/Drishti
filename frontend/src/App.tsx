import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStateProvider } from './GlobalState';
import { GlobalOverlay } from './GlobalOverlay';
import { Layout } from './Layout';
import { Dashboard } from './screens/Dashboard';
import { StrategicAnalytics } from './screens/StrategicAnalytics';
import { TacticalCommand } from './screens/TacticalCommand';
import { AiSurveillanceMatrix } from './screens/AiSurveillanceMatrix';
import { ThreatIntelligence } from './screens/ThreatIntelligence';
import { Health } from './screens/Health';

export default function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <GlobalOverlay />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<StrategicAnalytics />} />
            <Route path="/command" element={<TacticalCommand />} />
            <Route path="/surveillance" element={<AiSurveillanceMatrix />} />
            <Route path="/alerts" element={<ThreatIntelligence />} />
            <Route path="/health" element={<Health />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}
