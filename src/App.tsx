import React, { useRef } from 'react';
import './index.css'; // Tailwind CSS가 적용된 CSS 파일
import NavBar from './components/NavBar';
import Book from './components/Book';

const App: React.FC = () => {
  const bookRef = useRef<{ goPage: (pageNumber: number) => void }>(null);

  const goPage = (pageNumber: number) => {
    if (bookRef.current) {
      bookRef.current.goPage(pageNumber);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden font-songmyung">
      <NavBar goPage={goPage} />
      <Book ref={bookRef} />
    </div>
  );
};

export default App;
