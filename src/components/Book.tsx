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
import { useVideoModalStore, useCardStore, useUserIdStore } from '../store';
import VideoModal from './VideoModal';
import GreatListPageLeft from '../pages/GreatListPageLeft';
import GreatListPageRight from '../pages/GreatListPageRight';
import axios from 'axios';

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
  const isLeftPage = props.number % 2 !== 0;
  const shadowClass = isLeftPage ? 'shadow-[10px_0_20px_rgba(0,0,0,0.5)]' : 'shadow-[-10px_0_20px_rgba(0,0,0,0.5)]';

  return (
    <div className="relative flex items-center justify-center bg-gray-100" ref={ref} style={{ height: '100vh' }}>
      <img
        src={imageSource}
        alt=""
        className={`w-[600px] h-[700px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 rounded-l-sm rounded-r-sm ${shadowClass}`}
      />
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
  const [chatPageKey, setChatPageKey] = useState(0);
  const someStyle: React.CSSProperties = {};
  const [showModal, setShowModal] = useState(false);
  const [showGreatListModal, setShowGreatListModal] = useState(false);
  const { showVideoModal, setShowVideoModal } = useVideoModalStore();
  const { setCards } = useCardStore();
  const { userId } = useUserIdStore();

  useImperativeHandle(ref, () => ({
    movePage(pageNumber: number) {
      if (bookRef.current) {
        bookRef.current.pageFlip().flip(pageNumber);
      }
    },
  }));

  const movePage = (pageNumber: number) => {
    if (pageNumber === 9) {
      setChatPageKey((prevKey) => prevKey + 1);
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
    const fetchGreatPersons = async (userId: number) => {
      try {
        const response = await axios.get(`/api/greats/${userId}/`);
        setCards(response.data);
      } catch (error) {
        console.error('위대한 인물 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchGreatPersons(userId);

    setTimeout(() => {
      movePage(5);
    }, 500);
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
          props.setCurPage(e.data);
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
            <GreatListPageLeft movePage={movePage} />
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
            <GreatPageLeft movePage={movePage} />
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
            <GreatQuizPageLeft movePage={movePage} /> {/* movePage 전달 */}
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
            나라
          </button>
          <button
            onClick={() => handleCloseModalAndMovePage(3)}
            className="bg-[url('assets/images/FiledIndex.png')] bg-cover w-[100px] h-[40px] mb-3"
          >
            분야
          </button>
          <button
            onClick={handleShowGreatList}
            className="bg-[url('assets/images/FiledIndex.png')] bg-cover w-[100px] h-[40px]"
          >
            전체
          </button>
        </div>
      )}

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
          <div className="bg-[#7e4e2a] p-[70px] rounded-lg">
            <VideoModal />
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute text-xl text-white bg-[#952323] py-1 px-3 rounded-lg bottom-[23%] left-[48%]"
            >
              닫기
            </button>
          </div>
        </div>
      )}

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
