import React from 'react';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';
import EmptyPuzzle from '../assets/images/EmptyPuzzle.png';
import FilledPuzzle from '../assets/images/Puzzle.png';

interface GreatQuizPageRightProps {
  movePage: (pageNumber: number) => void;
  currentPage: number;
  onComplete: () => void; // 완료 버튼 클릭 핸들러 추가
}

const GreatQuizPageRight: React.FC<GreatQuizPageRightProps> = ({ movePage, currentPage, onComplete }) => {
  const puzzleCount = 2;
  const puzzlePieces = [...Array(4)].map((_, index) => (
    <img
      key={index}
      src={index < puzzleCount ? FilledPuzzle : EmptyPuzzle}
      className="w-10 h-10 mx-1"
      alt="퍼즐 조각"
    />
  ));

  return (
    <div className="relative h-[700px]">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[40px]">
        <div className="flex justify-center mb-3">{puzzlePieces}</div>
        <div className="w-[500px] h-[1px] bg-black"></div>
      </div>
      <div className="flex flex-col items-center mt-[100px] h-[calc(100%-100px)] overflow-y-auto">
        <div className="text-[25px] flex flex-col mb-8 leading-tight max-w-md break-words text-center">
          <span>
            Q. 문제 문제 문문제 문제문문제 문제문문제 문제문문제 문제문문제 문제문문제 문제문문제 문제문문제 문제문문제
            문제문문제 문제문제문문제 문제문
          </span>
        </div>
        <div className="w-[448px]">
          <div className="border border-black hover:bg-amber-950 hover:text-white rounded-md text-[20px] mb-1 p-2 text-center cursor-pointer">
            O
          </div>
          <div className="border border-black hover:bg-amber-950 hover:text-white rounded-md text-[20px] mt-1 p-2 text-center cursor-pointer">
            X
          </div>
        </div>

        <div className="flex justify-center mt-24">
          {currentPage === 11 || currentPage === 13 || currentPage === 15 ? (
            <button
              className="mx-4 text-2xl bg-no-repeat bg-center bg-cover text-white font-bold w-52 h-20"
              style={{ backgroundImage: `url(${RedBtn})` }}
              onClick={() => movePage(currentPage - 1)}
            >
              이전 문제
            </button>
          ) : null}

          {currentPage === 12 || currentPage === 14 ? (
            <button
              className="mx-4 text-2xl bg-no-repeat bg-center bg-cover text-white font-bold w-52 h-20"
              style={{ backgroundImage: `url(${BlueBtn})` }}
              onClick={() => movePage(currentPage + 1)}
            >
              다음 문제
            </button>
          ) : null}
          {currentPage === 16 ? (
            <button
              className="mx-4 text-2xl bg-no-repeat bg-center bg-cover text-white font-bold w-52 h-20"
              style={{ backgroundImage: `url(${BlueBtn})` }}
              onClick={onComplete} // 완료 버튼 클릭 핸들러 호출
            >
              완료
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GreatQuizPageRight;
