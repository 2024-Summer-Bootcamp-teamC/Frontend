import React from 'react';
import axios from 'axios';
import RedBtn from '../assets/images/GreatPageRedBtn.png';
import BlueBtn from '../assets/images/GreatPageBlueBtn.png';
import VerticalBtn from '../assets/images/GreatPageVerticalBtn.png';
import { useGreatPersonStore, useVideoModalStore } from '../store';

interface GreatPageRightProps {
  movePage: (pageNumber: number) => void;
}

const GreatPageRight: React.FC<GreatPageRightProps> = ({ movePage }) => {
  const { name, saying, life, greatId } = useGreatPersonStore();
  const { setShowVideoModal } = useVideoModalStore();

  const handleLearnMore = () => {
    setShowVideoModal(true);
  };

  const handleConversationClick = async () => {
    try {
      await axios.put(`/api/greats/${greatId}/talk/`, { access_cnt: true });
      movePage(9);
      console.log('good');
    } catch (error) {
      console.error('Failed to update access count', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-[200px]">
        <button
          className="fixed w-[50px] h-[150px] border-none text-white text-[16px] text-center bg-cover right-[100px] top-[-10px]"
          style={{ backgroundImage: `url(${VerticalBtn})`, writingMode: 'vertical-lr' }}
          onClick={handleLearnMore}
        >
          더 알아보기
        </button>
        <div className="text-[6rem] mt-[10rem]">{name}</div>
        <div className="text-[1.2rem] m-1">{life}</div>
        <div className="text-[2rem] ">{saying}</div>
        <button
          className="w-[200px] h-[70px] border-none text-white text-lg text-center bg-cover mb-5 font-semibold mr-5"
          style={{ backgroundImage: `url(${RedBtn})` }}
          onClick={handleConversationClick}
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
    </>
  );
};

export default GreatPageRight;
