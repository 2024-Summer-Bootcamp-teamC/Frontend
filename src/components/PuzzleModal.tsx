import React from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';

const PuzzleModal: React.FC = () => {
  return (
    <div className="w-4/5 p-6 mx-auto rounded-lg shadow-lg">
      <h1 className="text-5xl text-center">퍼즐획득!</h1>
      <div className="relative flex justify-center mb-6">
        <img src={imageSrc} alt="세종대왕" className="my-10"></img>
      </div>
      <div className="text-center">
        <button
          className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
          style={{ backgroundImage: `url(${RedBtn})` }}
        >
          이어서 풀기
        </button>
        <button
          className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
          style={{ backgroundImage: `url(${BlueBtn})` }}
        >
          카드 보러가기
        </button>
      </div>
    </div>
  );
};

export default PuzzleModal;
