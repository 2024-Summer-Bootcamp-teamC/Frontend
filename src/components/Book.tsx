import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import GreatChatPageRight from '../pages/GreatChatPageRight';
import MainPage from '../pages/MainPage';

interface PageCoverProps {
  children: React.ReactNode;
}

const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
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
  children: React.ReactNode;
}

const Page = React.forwardRef<HTMLDivElement, PageProps & { number: number }>((props, ref) => {
  const imageSource = props.number % 2 === 0 ? 'images/BookRightBg.png' : 'images/BookLeftBg.png';

  return (
    <div className="bg-gray-100" ref={ref}>
      <img src={imageSource} alt="" className="w-[600px] h-[700px] fixed -z-10" />
      <div className="z-10">{props.children}</div>
    </div>
  );
});

function Book(props: {}) {
  const bookRef = useRef<HTMLFlipBook>(null);
  const [curPage, setCurPage] = useState(0);

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
  const goPage = (pageNumber: number) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(pageNumber);
      bookRef.current.pageFlip().flipNext();
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
        <Page number={2}>
          <div>
            <GreatChatPageRight />
          </div>
        </Page>
        <Page number={3}>페이지 내용</Page>
        <Page number={4}>페이지 내용</Page>
      </HTMLFlipBook>

      {curPage == 0 && (
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
    </div>
  );
}

export default Book;
