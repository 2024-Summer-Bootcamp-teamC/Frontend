import React from 'react';
import CardBackImage from "../assets/images/CardBackImage.png";
import SejongClear from "../assets/images/SejongClear.png";
import SejongSay from "../assets/images/SejongSay.png";

const CardBack: React.FC = () => {
    return (
       <div className="relative flex-shrink-0 w-[237.298px] h-[366.962px]">
            <img 
                className="w-full h-full"
                src={CardBackImage} 
                alt='Back Of Card' 
            />
            <div className="absolute flex justify-between top-3 left-6 right-6"> {/* flex: 한줄배치, justify-between: 양끝배치, absolute와 ~:양쪽 여백설정 */}
                <span className="text-gray-400">한국/정치</span>
                <span className="text-white">세종대왕</span>
            </div>
            <img
                className="absolute bottom-[22px] left-1/2 transform -translate-x-1/2" //left-1/2: 왼쪽에서 50% 떨어지도록, -translate-x-1/2: 부모의 반절에 왼쪽 가장자리 위치->나의 반절을 왼쪽으로 => 중앙에 두둥!
                src={SejongClear}
                alt="Clear Great"
            />
            <img
                className="absolute top-[70px] justify-between left-6 right-6"
                src={SejongSay}
                alt="GreatSay"
            />
       </div>
    );
};

export default CardBack;
