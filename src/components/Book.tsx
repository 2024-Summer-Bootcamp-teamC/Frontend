import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import GreatChatPageRight from '../pages/GreatChatPageRight';
import GreatPageLeft from '../pages/GreatPageLeft';
import GreatPageRight from '../pages/GreatPageRight';
import GreatChatPageLeft from '../pages/GreatChatPageLeft';
import GreatQuizPageLeft from '../pages/GreatQuizPageLeft';
import GreatQuizPageRight from '../pages/GreatQuizPageRight';
import MapPage from '../pages/MapPage';
import MainPage from '../pages/MainPage';
import GreatListPage from '../pages/GreatListPage';
import ChartPageLeft from '../pages/ChartPageLeft';
import ChartPageRight from '../pages/ChartPageRight';
import axios from 'axios';
import PuzzleModal from '../components/PuzzleModal'; // PuzzleModal을 import합니다.

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
      <img src={imageSource} alt="" className="w-[600px] h-[700px] fixed -z-10" />
      <div className="z-10">{props.children}</div>
    </div>
  );
});

const Book = forwardRef((props, ref) => {
  const bookRef = useRef<React.ElementRef<typeof HTMLFlipBook>>(null);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('greats/1');
        console.log('response', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const someStyle: React.CSSProperties = {}; // htmlFlip 에러 없앨라고 추가
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  useImperativeHandle(ref, () => ({
    movePage(pageNumber: number) {
      if (bookRef.current) {
        bookRef.current.pageFlip().flip(pageNumber);
      }
    },
  }));

  const movePage = (pageNumber: number) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(pageNumber);
    }
  };

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext('top');
    }
  };

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev('top');
    }
  };

  const handleComplete = () => {
    setShowModal(true); // 완료 버튼을 누르면 모달을 보여줍니다.
  };

  const handleClick = () => {
    // 예시로 사용할 데이터 객체
    const newUser = {
      name: '최호',
      year: 2001,
    };

    // axios를 이용한 POST 요청
    axios
      .post('/users', newUser)
      .then((response) => {
        console.log('Response:', response.data);
        // 성공적으로 요청이 처리된 경우의 추가 작업
      })
      .catch((error) => {
        console.error('Error:', error);
        // 요청이 실패한 경우의 추가 작업
      });
  };

  return (
    <div className="relative flex flex-col items-center justify-center mt-[100px]">
      <HTMLFlipBook
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
        }}
        style={someStyle}
        className={''}
      >
        <PageCover></PageCover>

        {/* 지도 */}
        <Page number={1}>
          <div className="relative overflow-hidden">
            <MapPage part="left" move={movePage} />
          </div>
        </Page>
        <Page number={2}>
          <div className="relative overflow-hidden">
            <MapPage part="right" move={movePage} />
          </div>
        </Page>

        {/* 분야 */}
        <Page number={3}>
          <div className="absolute inset-0 flex items-center justify-center">{/* Field Page */}</div>
        </Page>
        <Page number={4}>
          <div className="absolute inset-0 flex items-center justify-center">{/* Field Page */}</div>
        </Page>

        {/* 인물 카드 리스트 */}
        <Page number={5}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-4/5 h-4/5">
              <GreatListPage movePage={movePage} />
            </div>
          </div>
        </Page>
        <Page number={6}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-4/5 h-4/5">
              <GreatListPage movePage={movePage} />
            </div>
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
            <GreatChatPageLeft />
          </div>
        </Page>
        <Page number={10}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatChatPageRight />
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
            <GreatQuizPageRight movePage={movePage} currentPage={12} />
          </div>
        </Page>
        <Page number={13}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatQuizPageRight movePage={movePage} currentPage={13} />
          </div>
        </Page>
        <Page number={14}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatQuizPageRight movePage={movePage} currentPage={14} />
          </div>
        </Page>
        <Page number={15}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatQuizPageRight movePage={movePage} currentPage={15} />
          </div>
        </Page>
        <Page number={16}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GreatQuizPageRight movePage={movePage} currentPage={16} onComplete={handleComplete} />{' '}
            {/* handleComplete을 완료 버튼에 전달 */}
          </div>
        </Page>

        {/* 차트 페이지 */}
        <Page number={17}>
          <ChartPageLeft />
        </Page>
        <Page number={18}>
          <ChartPageRight />
        </Page>
      </HTMLFlipBook>

      {curPage === 0 && (
        <div className="fixed left-[25%] h-[600px]">
          <MainPage next={nextPage} />
        </div>
      )}

      {curPage !== 0 && (
        <div className="fixed flex flex-col left-[5%] top-[15%] animate-slideInFromLeft">
          <button
            onClick={() => movePage(1)}
            className="bg-[url('assets/images/CountryIndex.png')] bg-cover w-[100px] h-[40px] mb-3"
          >
            나라별
          </button>
          <button
            onClick={() => movePage(3)}
            className="bg-[url('assets/images/FiledIndex.png')] bg-cover w-[100px] h-[40px]"
          >
            분야별
          </button>
        </div>
      )}
      <div className="z-10">
        <button onClick={prevPage}>이전 페이지</button>
        <button onClick={nextPage}>다음 페이지</button>
        <button onClick={handleClick}>유저 테스트</button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-70">
          <PuzzleModal movePage={movePage} closeModal={() => setShowModal(false)} />
          <button onClick={() => setShowModal(false)} className="absolute text-xl text-white top-5 right-5">
            닫기
          </button>
        </div>
      )}
    </div>
  );
});

export default Book;
