import React from 'react';
import CardFrontImage from "../assets/images/CardFrontImage.png";
import Rectangle from "../assets/images/Rectangle.png";

const CardFront: React.FC = () => {
  return (
    <div className="relative w-full h-full max-w-[237.298px] max-h-[366.962px]">
      {/* 카드 앞면 템플릿 */}
      <img 
        className="object-contain w-full h-full"
        src={CardFrontImage} 
        alt='Front Of Card' 
      />
      <div className="absolute flex flex-col items-center text-black top-3 left-4">
        <span className="text-lg">세</span>
        <span className="text-lg">종</span>
        <span className="text-lg">대</span>
        <span className="text-lg">왕</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          className="w-[154.336px] h-[200.652px] object-cover rounded-lg"
          src={Rectangle} 
          alt='Great Card' 
        />
      </div>
      <div className="absolute flex flex-col items-center text-black transform rotate-180 bottom-4 right-4">
        <span className="text-lg">세</span>
        <span className="text-lg">종</span>
        <span className="text-lg">대</span>
        <span className="text-lg">왕</span>
      </div>
    </div>
  );
};

export default CardFront;
