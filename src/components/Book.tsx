import React from 'react';
import FlipPage from 'react-flip-page';

import Bg from '../assets/images/BookBg.png'; // 배경 이미지 경로 설정
import CoverPage from '../assets/Book.png'; // 표지 이미지 경로 설정
import Page from '../assets/images/PageBg.png';
import LeftPage from '../assets/images/BookLeftBg.png'; // 왼쪽 페이지 배경 이미지 경로 설정
import RightPage from '../assets/images/BookRightBg.png'; // 오른쪽 페이지 배경 이미지 경로 설정

const Book: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center w-[80%] h-[800px]"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'contain', // 이미지가 컨테이너에 맞게 조절
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="overflow-hidden rounded-lg ">
        <FlipPage width={1350} height={730} orientation="horizontal" className="bg-white rounded-lg">
          {/* 표지 페이지 */}
          <article
            className="flex items-center justify-center w-full h-full bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${CoverPage})` }}
          >
            <h1 className="text-white">책 표지</h1>
          </article>
          {/* 첫 번째 페이지 */}
          <article
            className="flex items-center justify-center w-full h-full bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${Page})` }}
          >
            <h1 className="text-white">첫 페이지</h1>
          </article>
          {/* 두 번째 페이지 */}
          <article
            className="flex items-center justify-center w-full h-full bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${Page})` }}
          >
            <h1 className="text-white">두 번째 페이지</h1>
          </article>
          {/* 세 번째 페이지 */}
          <article
            className="flex items-center justify-center w-full h-full bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${Page})` }}
          >
            <h1 className="text-white">세 번째 페이지</h1>
          </article>
          {/* 네 번째 페이지 */}
          <article
            className="flex items-center justify-center w-full h-full bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${Page})` }}
          >
            <h1 className="text-white">네 번째 페이지</h1>
          </article>
        </FlipPage>
      </div>
    </div>
  );
};

export default Book;
