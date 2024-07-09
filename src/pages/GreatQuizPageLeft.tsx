import React from 'react';
import GreatImage from '../assets/images/GreatImgTmp.png';
import Back from '../assets/images/Back.png';
const GreatQuizPageLeft = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[35px]">이순신에 대해 어디까지 아니 ?</div>
      <img src={GreatImage} alt="인물 사진" className="w-56 mt-10" />
      <img src={Back} className="fixed bottom-0 left-0" alt="클립 이미지" />
    </div>
  );
};

export default GreatQuizPageLeft;
