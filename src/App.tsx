// src/App.tsx
import React from 'react';
import './index.css';
import GreatChatPageRight from './pages/GreatChatPageRight';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <GreatChatPageRight></GreatChatPageRight>
    </div>
  );
};

export default App;
