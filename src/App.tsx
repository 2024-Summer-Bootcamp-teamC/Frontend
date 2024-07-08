// src/App.tsx
import React from 'react';
import './index.css';
import DetailModal from './components/DetailModal';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <DetailModal></DetailModal>
    </div>
  );
};

export default App;
