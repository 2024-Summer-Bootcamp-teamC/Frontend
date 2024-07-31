import React from 'react';
import CardFrontImage from '../assets/images/CardFrontImage.png';

interface CardFrontProps {
  name: string;
  image: string;
  puzzleCount: number;
}

const CardFront: React.FC<CardFrontProps> = ({ name, image, puzzleCount }) => {
  // 퍼즐 조각의 개수에 따라 올바른 이미지를 선택합니다.
  const imageUrl = puzzleCount > 0 ? `${image.slice(0, image.lastIndexOf('.'))}${puzzleCount}.png` : image;
  console.log('Current imageUrl:', imageUrl);

  return (
    <div className="relative w-full h-full max-w-[200px] max-h-[300px]">
      <img className="object-contain w-full h-full" src={CardFrontImage} alt="Front Of Card" />
      <div className="absolute flex flex-col items-center text-black top-3 left-4">
        {name.split('').map((char, index) => (
          <span key={index} className="text-lg">
            {char}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center top-2">
        <div className="relative w-[135px] h-[175px]">
          <img className="object-cover w-full h-full rounded-lg" src={imageUrl} alt="Great Card" />
        </div>
      </div>
      <div className="absolute flex flex-col items-center text-black transform rotate-180 bottom-2 right-4">
        {name.split('').map((char, index) => (
          <span key={index} className="text-lg">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CardFront;
