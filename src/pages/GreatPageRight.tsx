import React from 'react';
import RedBtn from '../assets/images/GreatPageRedBtn.png';
import BlueBtn from '../assets/images/GreatPageBlueBtn.png';
import VerticalBtn from '../assets/images/GreatPageVerticalBtn.png';

interface GreatPageRightProps {
  goToPage: (pageNumber: number) => void;
}

const GreatPageRight: React.FC<GreatPageRightProps> = ({ goToPage }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className="fixed w-[3%] h-[150px] border-none text-white text-xs text-center bg-cover right-[30rem]"
        style={{ backgroundImage: `url(${VerticalBtn})`, writingMode: 'vertical-lr' }}
      >
        더 알아보기
      </button>
      <div className="text-[6rem] mt-[10rem] mb-[4rem]">{'이순신'}</div>
      <div className="text-[2rem] mb-[5rem]">{'"나의 죽음을 적에게 알리지 마라"'}</div>
      <button
        className="w-1/5 h-15 border-none text-white text-lg text-center leading-[60px] bg-cover mb-5 font-semibold"
        style={{ backgroundImage: `url(${RedBtn})` }}
        onClick={() => goToPage(4)} // 클릭 시 5페이지로 이동
      >
        대화하기
      </button>
      <button
        className="w-1/5 h-15 border-none text-white text-lg text-center leading-[60px] bg-cover font-semibold"
        style={{ backgroundImage: `url(${BlueBtn})` }}
        onClick={() => goToPage(6)} // 클릭 시 7페이지로 이동
      >
        퀴즈풀기
      </button>
    </div>
  );
};

export default GreatPageRight;
