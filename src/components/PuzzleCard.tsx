import React from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';

const PuzzleCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">퍼즐 획득!</h1>
      <div className="relative mb-6">
        <img src={imageSrc} alt="세종대왕" className="w-48 h-64" />
      </div>
      <div className="flex space-x-10">
        {/* 사진 css 수정하기 */}
        <button style={{ backgroundImage: `url(${RedBtn})` }}>이어서 풀기</button>
        <button style={{ backgroundImage: `url(${BlueBtn})` }}>카드 보기</button>
      </div>
    </div>
  );
};

export default PuzzleCard;
