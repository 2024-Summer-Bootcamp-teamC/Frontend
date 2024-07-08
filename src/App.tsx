// src/App.tsx
import React from 'react';
import './index.css';
import ChartPage from './pages/ChartPage';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <ChartPage />
    </div>
  );
};

export default App;
