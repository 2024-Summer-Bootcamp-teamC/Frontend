import React from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';

const PuzzleCard: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-40 w-4/5 mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-5xl text-center">퍼즐획득!</h1>
      <div className="flex relative mb-6 justify-center">
        <img src={imageSrc} alt="세종대왕" className="my-10"></img>
      </div>
      <div className="text-center">
        <button
          className="mx-4 text-2xl bg-no-repeat bg-center bg-cover text-white font-bold w-52 h-20"
          style={{ backgroundImage: `url(${RedBtn})` }}
        >
          이어서 풀기
        </button>
        <button
          className="mx-4 text-2xl bg-no-repeat bg-center bg-cover text-white font-bold w-52 h-20"
          style={{ backgroundImage: `url(${BlueBtn})` }}
        >
          카드 보러가기
        </button>
      </div>
    </div>
  );
};

export default PuzzleCard;
