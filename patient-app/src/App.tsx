import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import PatientListPage from './pages/PatientListPage/PatientListPage';
import PatientCreatePage from './pages/PatientCreatePage/PatientCreatePage';
import PatientEditPage from './pages/PatientEditPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<PatientListPage />} />
        <Route path="/create" element={<PatientCreatePage />} />
        <Route path="/edit/:id" element={<PatientEditPage />} />
      </Routes >
    </Router>
  );
};

export default App;
