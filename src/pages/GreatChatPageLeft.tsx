import React from 'react';
import TmpImg from '../assets/images/Rectangle.png';
import EmptyPuzzle from '../assets/images/EmptyPuzzle.png';
import FilledPuzzle from '../assets/images/Puzzle.png';
import Clip from '../assets/images/Clip.png';
import Back from '../assets/images/Back.png';

const GreatChatPageLeft: React.FC = () => {
  // 얻은 퍼즐 개수
  const puzzleCount = 2;
  return (
    <>
      {/* <img src={Clip} className="fixed left-[13rem] top-[5rem]" alt="클립 이미지" /> */}
      <div className="flex flex-col items-center justify-center w-[80%]">
        <div className="flex">
          {[...Array(4)].map((_, index) => (
            <img
              key={index}
              src={index < puzzleCount ? FilledPuzzle : EmptyPuzzle}
              className="w-10 h-10 mx-1 mb-24"
              alt="퍼즐 조각"
            />
          ))}
        </div>
        <img src={TmpImg} className="mb-1 w-[40%]" alt="임시 이미지" />
        <div className="text-[26px] mt-2">세종대왕</div>
      </div>
      <img src={Back} className="fixed bottom-0 left-0" alt="뒤로가기 이미지" />
    </>
  );
};

export default GreatChatPageLeft;
