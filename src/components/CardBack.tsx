import React from 'react';
import CardBackImage from '../assets/images/CardBackImage.png';

interface CardBackProps {
  name: string;
  saying_url: string;
  category: string;
  image: string;
}

const CardBack: React.FC<CardBackProps> = ({ name, saying_url, category, image }) => {
  return (
    <div className="relative w-full h-full max-w-[200px] max-h-[300px]">
      <img className="object-contain w-full h-full" src={CardBackImage} alt="Back Of Card" />
      <div className="absolute flex justify-between top-3 left-6 right-6">
        <span className="text-gray-400">{category}</span>
        <span className="text-white">{name}</span>
      </div>
      <img
        className="absolute bottom-[7px] w-[170px] h-[180px] left-[100px] transform -translate-x-1/2"
        src={image}
        alt="Great Person"
      />
      <div className="absolute top-[40px] w-[170px] h-[35px] justify-between right-[14.5px] text-center text-[16.5px]">
        <img src={saying_url} alt="명언 사진" />
      </div>
    </div>
  );
};

export default CardBack;
