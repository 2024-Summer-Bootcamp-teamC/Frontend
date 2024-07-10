// src/App.tsx
import React from 'react';
import './index.css'; // Tailwind CSS가 적용된 CSS 파일
import NavBar from './components/NavBar';
import Book from './components/Book';

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen font-songmyung overflow-hidden">
      <NavBar />
      <Book />
    </div>
  );
};

export default App;
