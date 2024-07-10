import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import GreatChatPageRight from '../pages/GreatChatPageRight';
import GreatPageLeft from '../pages/GreatPageLeft';
import GreatPageRight from '../pages/GreatPageRight';
import GreatChatPageLeft from '../pages/GreatChatPageLeft';
import GreatQuizPageLeft from '../pages/GreatQuizPageLeft';
import GreatQuizPageRight from '../pages/GreatQuizPageRight';
import MapPage from '../pages/MapPage';
import MainPage from '../pages/MainPage';
import ChartPage from '../pages/ChartPage';

interface PageCoverProps {
  children?: React.ReactNode;
}

const PageCover = forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  return (
    <div className="bg-teal-500" ref={ref}>
      <div className="page-content">
        <h2>{props.children}</h2>
        <img src="images/Book.png" alt="" className="w-[600px] h-[700px]" />
      </div>
    </div>
  );
});

interface PageProps {
  number: number;
  children?: React.ReactNode;
}

const Page = forwardRef<HTMLDivElement, PageProps & { number: number }>((props, ref) => {
  const imageSource = props.number % 2 === 0 ? 'images/BookRightBg.png' : 'images/BookLeftBg.png';

  return (
    <div className="bg-gray-100" ref={ref}>
      <img src={imageSource} alt="" className="w-[600px] h-[700px] fixed -z-10" />
      <div className="z-10">{props.children}</div>
    </div>
  );
});

const Book = forwardRef((props, ref) => {
  const bookRef = useRef<HTMLFlipBook>(null);
  const [curPage, setCurPage] = useState(0);

  useImperativeHandle(ref, () => ({
    goPage(pageNumber: number) {
      if (bookRef.current) {
        bookRef.current.pageFlip().flip(pageNumber);
      }
    }
  }));

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[100px]">
      <HTMLFlipBook
        width={600}
        height={700}
        size="stretch"
        minWidth={200}
        maxWidth={600}
        minHeight={300}
        maxHeight={800}
        drawShadow={true}
        flippingTime={1000}
        className="book-theme"
        startPage={0}
        usePortrait={true}
        startZIndex={30}
        autoSize={true}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={false}
        swipeDistance={3}
        showPageCorners={true}
        disableFlipByClick={false}
        ref={bookRef}
        onFlip={(e) => {
          setCurPage(e.data);
        }}
      >
        <PageCover></PageCover>
        <Page number={1}></Page>
        <Page number={2}></Page>
        <Page number={3}>
          <GreatPageLeft />
        </Page>
        <Page number={4}>
          <GreatPageRight />
        </Page>
        <Page number={5}>
          <GreatChatPageLeft />
        </Page>
        <Page number={6}>
          <GreatChatPageRight />
        </Page>
        <Page number={7}>
          <GreatQuizPageLeft />
        </Page>
        <Page number={8}>
          <GreatQuizPageRight />
        </Page>
        <Page number={9}>
          <ChartPage />
        </Page>
      </HTMLFlipBook>

      {curPage === 0 && (
        <div className="fixed left-[25%]">
          <MainPage next={nextPage} />
        </div>
      )}
      {curPage !== 0 && (
        <div className="fixed flex flex-col left-[2.2%] top-[15%]">
          <button
            onClick={() => goPage(2)}
            className="bg-[url('assets/images/CountryIndex.png')] bg-cover w-[100px] h-[40px] mb-3"
          >
            나라별
          </button>
          <button
            onClick={() => goPage(2)}
            className="bg-[url('assets/images/FiledIndex.png')] bg-cover w-[100px] h-[40px]"
          >
            분야별
          </button>
        </div>
      )}
      <div>
        <button onClick={prevPage}>이전 페이지</button>
        <button onClick={nextPage}>다음 페이지</button>
      </div>
    </div>
  );
});

export default Book;
