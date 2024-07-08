import React from 'react';
import BookImage from '../assets/Book.png'; // 책 이미지 경로 설정
import BookmarkImage from '../assets/Bookmark.png'; // 북마크 이미지 경로 설정

const MainPage: React.FC = () => {
  const currentYear = new Date().getFullYear(); 
  const years = Array.from({ length: currentYear - 1999 + 1 }, (_, i) => 1999 + i);

  return (
      <div className="flex items-center">
        {/* 왼쪽 컨텐츠 */}
        <div className="w-5/6 pr-24 text-center">
          <h1 className="mt-6 mb-16 text-4xl font-bold whitespace-nowrap">서비스 이름</h1>
          <div className="mb-7">
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요."
              className="w-[65%] px-3 py-1 mx-auto text-lg transform border border-gray-300 rounded"
            />
            <h1 className="block mt-10 mb-4 text-lg"></h1>
            <select id="age" className="w-1/4 px-3 py-1 mx-auto text-lg text-gray-500 transform border border-gray-300 rounded">
              <option value="">나이</option>
              {years.map((year) => ( <option key={year} value={year}>{year}</option> ))}
            </select>
            <div className="relative flex items-center justify-center h-20 mt-6">
              {/* 북마크 이미지 */}
              <img
                src={BookmarkImage}
                alt="Bookmark"
                className="absolute z-0 object-contain w-full h-full transform scale-150"
              />
              <button className="absolute z-10 p-3 text-lg text-black rounded bg-brown-500 hover:bg-brown-600">
                시작하기
              </button>
            </div>
          </div>
        </div>
        {/* 오른쪽 책 이미지 */}
        <div className="relative flex justify-center w-2/3">
          <div className="relative">
            <img src={BookImage} alt="Book" className="z-10 w-144" /> {/* 책 이미지 */}
          </div>
        </div>
      </div>
  );
};

export default MainPage;