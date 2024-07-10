import React from 'react';
import './index.css';
import FieldPage from './pages/FieldPage';
//import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
  <div className="flex items-center justify-center min-h-screen font-songmyung">
      <FieldPage />
  </div>
  );
};

export default App;
