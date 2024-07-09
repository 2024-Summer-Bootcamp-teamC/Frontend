// src/App.tsx
import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import GreatPage from './pages/GreatPage';
import GreatQuizPageLeft from './pages/GreatQuizPageLeft';
import GreatQuizPageRight from './pages/GreatQuizPageRight';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <div className="App">
        <GreatQuizPageRight></GreatQuizPageRight>
      </div>
    </div>
  );
};

export default App;
