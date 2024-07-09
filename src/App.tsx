// src/App.tsx
import React from 'react';
import './index.css';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-songmyung">
      <div className="App">
          <NavBar />
          <div className="content">
              <h1 className="">   ┏┯┯┯┯┯┓</h1>
              <h1 className="">   ┃││∧ ∧│┃살려줘!!</h1>
              <h1 className="">   ┃│  (≧Д≦)  ┃</h1>
              <h1 className="">   ┃││ф  ф│┃</h1>
              <h1 className="">   ┗┷┷┷┷┷┛</h1>
          </div>
      </div>
    </div>
  );
};

export default App;