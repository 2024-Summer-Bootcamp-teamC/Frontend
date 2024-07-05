// src/App.tsx
import React from 'react';
import './index.css';
import GreatPageLeft from './pages/GreatPageLeft';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <GreatPageLeft />
    </div>
  );
};

export default App;
