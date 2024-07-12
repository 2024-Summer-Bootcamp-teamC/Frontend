import React, { useRef } from 'react';
import './index.css'; // Tailwind CSS가 적용된 CSS 파일
import NavBar from './components/NavBar';
import Book from './components/Book';

const App: React.FC = () => {
  const bookRef = useRef<{ movePage: (pageNumber: number) => void }>(null);

  const movePage = (pageNumber: number) => {
    if (bookRef.current) {
      bookRef.current.movePage(pageNumber);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden font-songmyung">
      <NavBar movePage={movePage} />
      <Book ref={bookRef} />
    </div>
  );
};

export default App;
