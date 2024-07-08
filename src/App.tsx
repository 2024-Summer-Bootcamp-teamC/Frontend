// src/App.tsx
import React from 'react';
import './index.css';
import GreatChatPageLeft from './pages/GreatChatPageLeft';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <GreatChatPageLeft></GreatChatPageLeft>
    </div>
  );
};

export default App;
