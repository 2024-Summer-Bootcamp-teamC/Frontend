import React from 'react';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';
import EmptyPuzzle from '../assets/images/EmptyPuzzle.png';
import FilledPuzzle from '../assets/images/Puzzle.png';

const GreatQuizPageRight = () => {
  const d = 1;
  const puzzleCount = 2;
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {[...Array(4)].map((_, index) => (
          <img
            key={index}
            src={index < puzzleCount ? FilledPuzzle : EmptyPuzzle}
            className="mb-2 mx-1 w-10 h-10 "
            alt="퍼즐 조각"
          />
        ))}
      </div>
      <div className="w-[510px] h-[1px] bg-black mt-3 mb-12"></div>
      <div className="text-[25px] flex flex-col mb-8 leading-tight max-w-md break-words">
        <span>Q. 문제 문제 문제문제 문제 문제 문제문제문제 문제 문제문제 문제 문제 문제문제</span>
      </div>
      <div className="w-[448px]">
        <div className="border border-black hover:bg-amber-950 hover:text-white rounded-md text-[20px] mb-1"> O</div>
        <div className="border border-black hover:bg-amber-950 hover:text-white rounded-md text-[20px] mt-1">X</div>
      </div>

      <div className="text-center m-24">
        <button
          className="mx-4 text-2xl bg-no-repeat bg-center bg-cover text-white font-bold w-52 h-20"
          style={{ backgroundImage: `url(${RedBtn})` }}
        >
          이전 문제
        </button>
        <button
          className="mx-4 text-2xl bg-no-repeat bg-center bg-cover text-white font-bold w-52 h-20"
          style={{ backgroundImage: `url(${BlueBtn})` }}
        >
          다음 문제
        </button>
      </div>
    </div>
  );
};

export default GreatQuizPageRight;
