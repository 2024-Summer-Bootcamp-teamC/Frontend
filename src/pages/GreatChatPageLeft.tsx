import React from 'react';
import TmpImg from '../assets/images/Rectangle.png';
import EmptyPuzzle from '../assets/images/EmptyPuzzle.png';
import FilledPuzzle from '../assets/images/Puzzle.png';
import ArrowBack from '../assets/arrow_back.png';
import { useGreatPersonStore } from '../store';

interface GreatChatProps {
  movePage: (pageNumber: number) => void;
}

const GreatChatPageLeft: React.FC<GreatChatProps> = ({ movePage }) => {
  const { greatId, name, puzzle_cnt } = useGreatPersonStore();

  return (
    <>
      <div
        className="absolute top-[350px] left-[40px] cursor-pointer"
        onClick={() => {
          movePage(7);
        }}
      >
        <img src={ArrowBack} alt="인물 페이지로 다시 가기" className=" w-17 h-12" />
      </div>
      <div className="flex flex-col items-center justify-center mb-[30px] ">
        <div className="flex">
          {[...Array(4)].map((_, index) => (
            <img
              key={index}
              src={index < puzzle_cnt ? FilledPuzzle : EmptyPuzzle}
              className="w-10 h-10 mx-1 mb-24"
              alt="퍼즐 조각"
            />
          ))}
        </div>
        <img src={TmpImg} className="mb-1 w-[100%]" alt="임시 이미지" />
        <div className="text-[26px] mt-2">{name}</div>
      </div>
    </>
  );
};

export default GreatChatPageLeft;
