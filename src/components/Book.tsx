import React, { useEffect, useRef, useState } from 'react';
import FlipPage from 'react-flip-page';
import Bg from '../assets/images/BookBg.png'; // 배경 이미지 경로 설정
import CoverPage from '../assets/Book.png'; // 표지 이미지 경로 설정
import Page from '../assets/images/PageBg.png';
import CountryIndex from '../assets/images/CountryIndex.png';
import FiledIndex from '../assets/images/FiledIndex.png';

const Book: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const flipPageRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지 인덱스

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth * 0.8; // 80vw
      const height = window.innerHeight * 0.78; // 78vh
      setDimensions({ width, height });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const nextPage = () => {
    if (flipPageRef.current && flipPageRef.current.gotoNextPage) {
      flipPageRef.current.gotoNextPage();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (flipPageRef.current && flipPageRef.current.gotoPreviousPage) {
      flipPageRef.current.gotoPreviousPage();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goPage = (pageIndex: number) => {
    if (flipPageRef.current) {
      const currentIndex = flipPageRef.current.state.page;

      if (pageIndex > currentIndex) {
        for (let i = currentIndex; i < pageIndex; i++) {
          setTimeout(() => {
            flipPageRef.current.gotoNextPage();
            setCurrentPage((prev) => prev + 1);
          }, i * 300); // 1초마다 페이지 넘기기 (예: i * 1000)
        }
      } else if (pageIndex < currentIndex) {
        for (let i = currentIndex; i > pageIndex; i--) {
          setTimeout(
            () => {
              flipPageRef.current.gotoPreviousPage();
              setCurrentPage((prev) => prev - 1);
            },
            (currentIndex - i) * 300,
          ); // 1초마다 페이지 넘기기 (예: (currentIndex - i) * 1000)
        }
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center w-[82vw] h-[100vh] mt-[3%]"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'contain', // 이미지가 컨테이너에 맞게 조절
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="overflow-hidden rounded-lg">
        <FlipPage
          ref={flipPageRef}
          width={dimensions.width}
          height={dimensions.height}
          orientation="horizontal"
          className="bg-white rounded-lg"
        >
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
      <div className="fixed flex flex-col top-[10rem] left-[3.4%] text-[1.2rem]">
        <button
          onClick={() => goPage(4)}
          className="w-[7rem] h-[3rem] bg-cover"
          style={{ backgroundImage: `url(${CountryIndex})` }}
        >
          4페이지로
        </button>
        <button
          onClick={() => goPage(1)}
          className=" w-[7rem] h-[3rem] mt-3 bg-cover"
          style={{ backgroundImage: `url(${FiledIndex})` }}
        >
          1페이지로
        </button>
      </div>
    </div>
  );
};

export default Book;
