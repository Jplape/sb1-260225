import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Layout from './components/layout/Layout';
import Dashboard from './features/dashboard/Dashboard';
import Interventions from './features/interventions/Interventions';
import Equipment from './features/equipment/Equipment';
import Reports from './features/reports/Reports';
import Settings from './features/settings/Settings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;