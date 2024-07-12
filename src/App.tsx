import React from 'react';
import './index.css';
import FieldPage from './pages/FieldPage';
//import MainPage from './pages/MainPage';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
  <div className="flex items-center justify-center min-h-screen font-songmyung">
      <NavBar />
      <FieldPage />
    
  </div>
  );
};

export default App;
