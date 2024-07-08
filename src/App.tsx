// src/App.tsx
import React from 'react';
import './index.css';
import MapPage from './pages/MapPage';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <MapPage />
    </div>
  );
};

export default App;
