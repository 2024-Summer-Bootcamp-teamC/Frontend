import React from 'react';
import RedBtn from '../assets/images/GreatPageRedBtn.png';
import BlueBtn from '../assets/images/GreatPageBlueBtn.png';
import VerticalBtn from '../assets/images/GreatPageVerticalBtn.png';

interface GreatPageRightProps {
  movePage: (pageNumber: number) => void;
}

const GreatPageRight: React.FC<GreatPageRightProps> = ({ movePage }) => {
  return (
    <div className="flex flex-col items-center mb-[200px]">
      <button
        className="fixed w-[50px] h-[150px] border-none text-white text-[16px] text-center bg-cover right-[100px] top-[-10px]"
        style={{ backgroundImage: `url(${VerticalBtn})`, writingMode: 'vertical-lr' }}
      >
        더 알아보기
      </button>
      <div className="text-[6rem] mt-[10rem]">{'이순신'}</div>
      <div className="text-[2rem] m-[40px]">{'"나의 죽음을 적에게 알리지 마라"'}</div>
      <button
        className="w-[200px] h-[70px] border-none text-white text-lg text-center bg-cover mb-5 font-semibold mr-5"
        style={{ backgroundImage: `url(${RedBtn})` }}
        onClick={() => movePage(9)}
      >
        대화하기
      </button>
      <button
        className="w-[200px] h-[70px] border-none text-white text-lg text-center bg-cover font-semibold ml-5"
        style={{ backgroundImage: `url(${BlueBtn})` }}
        onClick={() => movePage(11)}
      >
        퀴즈풀기
      </button>
    </div>
  );
};

export default GreatPageRight;
