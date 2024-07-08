import React from 'react';
import './index.css';
import NavBar from './components/NavBar';
import Puzzle from './components/Puzzle';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <div className="App">
          <NavBar />
          <Puzzle />

      </div>
    </div>
  );
};

export default App;