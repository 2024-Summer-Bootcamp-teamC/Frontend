// src/App.tsx
import React from 'react';
import './index.css';
import PuzzleCard from './components/PuzzleCard';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <PuzzleCard />
    </div>
  );
};

export default App;
