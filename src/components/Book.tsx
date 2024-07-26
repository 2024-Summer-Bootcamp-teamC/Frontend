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
import FieldPageLeft from '../pages/FieldPageLeft';
import FieldPageRight from '../pages/FieldPageRight';
import ChartPageLeft from '../pages/ChartPageLeft';
import ChartPageRight from '../pages/ChartPageRight';
import PuzzleModal from '../components/PuzzleModal';
import { useVideoModalStore } from '../store';
import VideoModal from './VideoModal';
import GreatListPageLetf from '../pages/GreatListPageLeft';
import GreatListPageRight from '../pages/GreatListPageRight';

interface PageCoverProps {
  children?: React.ReactNode;
}

const PageCover = forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  return (
    <div ref={ref}>
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

const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const imageSource = props.number % 2 === 0 ? 'images/tmpRight.png' : 'images/tmpLeft.png';

  return (
    <div className="bg-gray-100" ref={ref}>
      <img src={imageSource} alt="" className="w-[600px] h-[700px] fixed -z-10 rounded-l-sm rounded-r-sm" />
      <div className="z-10">{props.children}</div>
    </div>
  );
});

interface BookProps {
  setCurPage: (pageNumber: number) => void;
}

const Book = forwardRef((props: BookProps, ref) => {
  const bookRef = useRef<React.ElementRef<typeof HTMLFlipBook>>(null);
  const leftPageRef = useRef<{ playVideo: () => void; pauseVideo: () => void }>(null);
  const [curPage, setCurPage] = useState(0);
  const [puzzleModalOpen, setPuzzleModalOpen] = useState(false);
  const [chatPageKey, setChatPageKey] = useState(0); // 대화창을 새로고침하기 위한 key
  const someStyle: React.CSSProperties = {}; // htmlFlip 에러 없앨라고 추가
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [showGreatListModal, setShowGreatListModal] = useState(false); // GreatList 모달 상태 추가
  const { showVideoModal, setShowVideoModal } = useVideoModalStore();
  
  useImperativeHandle(ref, () => ({
    movePage(pageNumber: number) {
      if (bookRef.current) {
        bookRef.current.pageFlip().flip(pageNumber);
      }
    },
  }));

  const movePage = (pageNumber: number) => {
    if (pageNumber === 9) {
      setChatPageKey((prevKey) => prevKey + 1); // 대화창으로 이동할 때 key 변경
    }
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(pageNumber);
    }
  };

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext('top');
    }
  };

  const handleComplete = () => {
    setShowModal(true);
  };

  const handleShowGreatList = () => {
    movePage(5);
  };

  const handleCloseModalAndMovePage = (pageNumber: number) => {
    setShowGreatListModal(false);
    setTimeout(() => {
      movePage(pageNumber);
    }, 500);
  };

  const handlePuzzleModalClose = () => {
    setPuzzleModalOpen(false);
  };

  const handleShowPuzzleModal = () => {
    setPuzzleModalOpen(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center mt-[100px]">
      <HTMLFlipBook
        style={someStyle}
        width={600}
        height={700}
        size="stretch"
        minWidth={200}
        maxWidth={600}
        minHeight={300}
        maxHeight={800}
        drawShadow={true}
        flippingTime={700}
        startPage={0}
        usePortrait={true}
        startZIndex={30}
        autoSize={true}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        swipeDistance={3}
        showPageCorners={true}
        disableFlipByClick={false}
        useMouseEvents={false}
        ref={bookRef}
        onFlip={(e) => {
          setCurPage(e.data);
          props.setCurPage(e.data); // 현재 페이지 상태 업데이트
        }}
        className={''}
      >
        <PageCover></PageCover>

        {/* 지도 */}
        <Page number={1}>
          <div className="relative overflow-hidden top-10">
            <MapPage part="left" move={movePage} />
          </div>
        </Page>
        <Page number={2}>
          <div className="relative overflow-hidden top-10">
            <MapPage part="right" move={movePage} />
          </div>
        </Page>

        {/* 분야 */}
        <Page number={3}>
          <div className="absolute inset-0 flex items-center justify-center">
            <FieldPageLeft movePage={movePage} />
          </div>
        </Page>
        <Page number={4}>
          <div className="absolute inset-0 flex items-center justify-center">
            <FieldPageRight movePage={movePage} />
          </div>
        </Page>

        {/* 인물 목록 */}
        <Page number={5}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatListPageLetf movePage={movePage} />
          </div>
        </Page>
        <Page number={6}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatListPageRight movePage={movePage} />
          </div>
        </Page>

        {/* 인물 프로필 */}
        <Page number={7}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatPageLeft />
          </div>
        </Page>
        <Page number={8}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatPageRight movePage={movePage} />
          </div>
        </Page>

        {/* 인물 대화 창 */}
        <Page number={9}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatChatPageLeft ref={leftPageRef} movePage={movePage} />
          </div>
        </Page>
        <Page number={10}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatChatPageRight
              key={chatPageKey}
              playVideo={() => leftPageRef.current?.playVideo()}
              pauseVideo={() => leftPageRef.current?.pauseVideo()}
            />
          </div>
        </Page>

        {/* 인물 퀴즈 페이지 11 ~ 16 */}
        <Page number={11}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatQuizPageLeft />
          </div>
        </Page>
        <Page number={12}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatQuizPageRight
              movePage={movePage}
              currentPage={12}
              onComplete={handleComplete}
              showPuzzleModal={handleShowPuzzleModal}
            />
          </div>
        </Page>

        {/* 차트 페이지 */}
        <Page number={13}>
          <ChartPageLeft />
        </Page>
        <Page number={14}>
          <ChartPageRight />
        </Page>
      </HTMLFlipBook>

      {curPage === 0 && (
        <div className="fixed left-[300px] h-[600px]">
          <MainPage next={nextPage} />
        </div>
      )}

      {curPage !== 0 && (
        <div className="fixed flex flex-col left-[5%] top-[15%] animate-slideInFromLeft z-50">
          <button
            onClick={() => handleCloseModalAndMovePage(1)}
            className="bg-[url('assets/images/CountryIndex.png')] bg-cover w-[100px] h-[40px] mb-3"
          >
            나라별
          </button>
          <button
            onClick={() => handleCloseModalAndMovePage(3)}
            className="bg-[url('assets/images/FiledIndex.png')] bg-cover w-[100px] h-[40px] mb-3"
          >
            분야별
          </button>
          <button
            onClick={handleShowGreatList} // 버튼 클릭 시 페이지 이동 후 모달 표시
            className="bg-[url('assets/images/FiledIndex.png')] bg-cover w-[100px] h-[40px]"
          >
            전체
          </button>
        </div>
      )}
      {/* <div className="z-10">
        <button onClick={prevPage}>이전 페이지</button>
        <button onClick={nextPage}>다음 페이지</button>
      </div> */}

      {showModal && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-70">
          <PuzzleModal
            openModal={showModal}
            movePage={movePage}
            closeModal={() => setShowModal(false)}
            showGreatList={handleShowGreatList}
            resetQuiz={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <button onClick={() => setShowModal(false)} className="absolute text-xl text-white top-5 right-5">
            닫기
          </button>
        </div>
      )}

      {showVideoModal && (
        <div className="fixed top-0 left-0 z-[1000] flex items-center justify-center w-full h-full bg-white bg-opacity-70">
          <div className="bg-[#95a3b4] p-[70px] rounded-lg">
            <VideoModal />
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute text-xl text-white bg-[#00315a] py-1 px-3 rounded-lg bottom-[23%] left-[48%]"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* PuzzleModal */}
      {puzzleModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <PuzzleModal
            openModal={puzzleModalOpen}
            movePage={movePage}
            closeModal={handlePuzzleModalClose}
            showGreatList={handleShowGreatList}
            resetQuiz={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      )}
    </div>
  );
});

export default Book;
