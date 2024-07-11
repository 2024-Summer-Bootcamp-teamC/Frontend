import React from 'react';
import CardBackImage from "../assets/images/CardBackImage.png";
import SejongClear from "../assets/images/SejongClear.png";
import SejongSay from "../assets/images/SejongSay.png";

const CardBack: React.FC = () => {
  return (
    <div className="relative w-full h-full max-w-[236.48px] max-h-[365.34px] transform scale-70">
      <img 
        className="object-contain w-full h-full"
        src={CardBackImage} 
        alt='Back Of Card' 
      />
      <div className="absolute flex justify-between top-3 left-6 right-6 ">
        <span className="text-gray-400">한국/정치</span>
        <span className="text-white">세종대왕</span>
      </div>
      <img
        className="absolute bottom-[22px] w-[195px] h-[227px] left-1/2 transform -translate-x-1/2 scale-70"
        src={SejongClear}
        alt="Clear Great"
      />
      <img
        className="absolute top-[70px] w-[175px] h-[35px] justify-between left-6 right-6"
        src={SejongSay}
        alt="GreatSay"
      />
    </div>
  );
};

export default CardBack;
