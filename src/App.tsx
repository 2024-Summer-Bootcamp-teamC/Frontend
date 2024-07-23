import React, { useRef, useState } from 'react';
import './index.css'; // Tailwind CSS가 적용된 CSS 파일
import NavBar from './components/NavBar';
import Book from './components/Book';

const App: React.FC = () => {
  const bookRef = useRef<{ movePage: (pageNumber: number) => void }>(null);
  const [curPage, setCurPage] = useState(0); // 현재 페이지 상태 추가

  const movePage = (pageNumber: number) => {
    if (bookRef.current) {
      bookRef.current.movePage(pageNumber);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden font-songmyung">
      <NavBar movePage={movePage} curPage={curPage} /> {/* 현재 페이지 상태 전달 */}
      <Book ref={bookRef} setCurPage={setCurPage} /> {/* 현재 페이지 상태 업데이트 함수 전달 */}
    </div>
  );
};

export default App;
