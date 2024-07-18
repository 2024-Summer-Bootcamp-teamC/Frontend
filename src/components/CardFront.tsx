import React from 'react';
import CardFrontImage from '../assets/images/CardFrontImage.png';
import FrontSejong from '../assets/images/FrontSejong.png';
interface CardFrontProps {
  name: string;
  image: string;
}

const CardFront: React.FC<CardFrontProps> = ({ name, image }) => {
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
        <img className="w-[130px] h-[170px] object-cover rounded-lg" src={image} alt="Great Card" />
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
