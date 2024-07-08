// src/App.tsx
import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import GreatPage from './pages/GreatPage';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-songmyung">
      <NavBar />
      <div className="content"> main 입니당 ~?? </div>
    </div>
  );
};

export default App;
