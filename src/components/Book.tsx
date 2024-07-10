import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import GreatChatPageRight from '../pages/GreatChatPageRight';

interface PageCoverProps {
  children: React.ReactNode;
}

const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  return (
    <div className="bg-teal-500" ref={ref}>
      <div className="page-content">
        <h2>{props.children}</h2>
        <img src="../assets/images/PageBg.png" alt="" className="w-[100px] h-[100px]" />
      </div>
    </div>
  );
});

interface PageProps {
  number: number;
  children: React.ReactNode;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className="bg-gray-100" ref={ref}>
      <h1>페이지 헤더</h1>
      <p>{props.children}</p>
      <p>페이지 번호: {props.number}</p>
      <button onClick={() => console.log('버튼 클릭됨')}>클릭하기</button>
      <input></input>
    </div>
  );
});

function Book(props: {}) {
  const bookRef = useRef<HTMLFlipBook>(null);

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
    <div>
      <div>
        <button onClick={prevPage}>이전 페이지</button>
        <button onClick={nextPage}>다음 페이지</button>
      </div>

      <HTMLFlipBook
        width={600}
        height={500}
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        ref={bookRef}
        useMouseEvents={false}
        showCover={true}
        size="stretch"
      >
        <PageCover>책 제목</PageCover>
        <Page number={1}>
          <GreatChatPageRight />
        </Page>
        <Page number={2}>페이지 내용</Page>
        <Page number={3}>페이지 내용</Page>
        <Page number={4}>페이지 내용</Page>
      </HTMLFlipBook>
    </div>
  );
}

export default Book;
