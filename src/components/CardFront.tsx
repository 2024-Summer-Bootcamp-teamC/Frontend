import React from 'react';
import CardFrontImage from '../assets/images/CardFrontImage.png';

interface CardFrontProps {
  name: string;
  image: string;
  overlayImages?: string[]; // 오버레이 이미지 배열로 변경
}

const CardFront: React.FC<CardFrontProps> = ({ name, image, overlayImages }) => {
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
        <div className="relative w-[130px] h-[170px]">
          <img className="object-cover w-full h-full rounded-lg" src={image} alt="Great Card" />
          {overlayImages && overlayImages.map((overlayImage, index) => (
            <img
              key={index}
              className={`absolute w-[65px] h-[85px] object-cover rounded-lg ${
                index === 0 ? 'top-0 left-0' : // 첫 번째 오버레이 이미지 위치 조정
                index === 1 ? 'top-0 right-0' : // 두 번째 오버레이 이미지 위치 조정
                index === 2 ? 'bottom-0 left-0' : // 세 번째 오버레이 이미지 위치 조정
                'bottom-0 right-0' // 네 번째 오버레이 이미지 위치 조정
              }`}
              src={overlayImage}
              alt={`Overlay ${index}`}
            />
          ))}
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
