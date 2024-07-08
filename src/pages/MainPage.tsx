import React from 'react';
import '../index.css'; // Tailwind CSS가 적용된 CSS 파일
import BookImage from '../assets/Book.png'; // 책 이미지 경로 설정
import BookmarkImage from '../assets/Bookmark.png'; // 북마크 이미지 경로 설정
import Bg from '../assets/Bg.png'; // 배경 이미지 경로 설정

const App: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
    >
      <div className="flex items-center">
        {/* 왼쪽 컨텐츠 */}
        <div className="w-5/6 pr-24 text-center">
          <h1 className="text-6xl font-bold mt-6 mb-16 whitespace-nowrap text-4.5xl">서비스 이름</h1>
          <div className="mb-7">
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요."
              className="w-1/2 p-3 border border-gray-300 rounded text-lg mx-auto transform scale-60"
            />
            <h1 className="block text-lg mt-10 mb-4"></h1>
            <select id="age" className="w-1/4 p-3 border border-gray-300 rounded text-lg mx-auto transform scale-60">
              <option value="">나이</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>

            </select>
            <div className="relative mt-6 h-20 flex justify-center items-center">
              {/* 북마크 이미지 */}
              <img
                src={BookmarkImage}
                alt="Bookmark"
                className="absolute w-full h-full object-contain transform scale-150 z-0"
              />
              <button className="absolute p-3 bg-brown-500 text-black rounded hover:bg-brown-600 z-10 text-lg">
                시작하기
              </button>
            </div>
          </div>
        </div>
        {/* 오른쪽 책 이미지 */}
        <div className="w-2/3 flex justify-center relative">
          <div className="relative">
            <img src={BookImage} alt="Book" className="w-144 z-10" /> {/* 책 이미지 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;