import React, { useState } from 'react';
import axios from 'axios';
import RedBtn from '../assets/images/GreatPageRedBtn.png';
import BlueBtn from '../assets/images/GreatPageBlueBtn.png';
import VerticalBtn from '../assets/images/GreatPageVerticalBtn.png';
import ExplanationModal from '../components/ExplanationModal';
import { useUserIdStore, useGreatPersonStore, useVideoModalStore, useQuizStore, useTriggerChatStore } from '../store';

interface GreatPageRightProps {
  movePage: (pageNumber: number) => void;
}

const GreatPageRight: React.FC<GreatPageRightProps> = ({ movePage }) => {
  const { name, saying, life, greatId, puzzle_cnt } = useGreatPersonStore();
  const { userId } = useUserIdStore();
  const { setShowVideoModal } = useVideoModalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const { setCount } = useTriggerChatStore();
  const handleLearnMore = () => {
    setShowVideoModal(true);
  };

  const handleQuiz = async () => {
    if (puzzle_cnt === 4) {
      setExplanation('퍼즐을 다 모으셨습니다. 다시 푸시겠습니까?');
      setIsModalOpen(true);
    } else {
      try {
        const response = await axios.get(`/api/quizzes/${userId}/${greatId}/`);
        const quizzes = response.data;
        useQuizStore.getState().setQuizzes(quizzes);
        console.log(quizzes);
        setTimeout(() => {
          movePage(11);
        }, 300);
      } catch (error) {
        console.error('퀴즈 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleConversationClick = async () => {
    try {
      await axios.put(`/api/greats/${greatId}/talk/`, { access_cnt: true });
      movePage(9);
      console.log('성공적으로 업데이트되었습니다.');
      setCount();
    } catch (error) {
      console.error('접근 횟수 업데이트 실패', error);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // 여기에 추가적인 동작이 필요하면 작성
  };

  return (
    <>
      <div className="flex flex-col items-center mb-[150px] mr-[35px]">
        <button
          className="fixed w-[50px] h-[150px] border-none text-white text-[17px] text-center bg-cover right-[100px] top-[-10px]"
          style={{ backgroundImage: `url(${VerticalBtn})`, writingMode: 'vertical-lr' }}
          onClick={handleLearnMore}
        >
          더 알아보기
        </button>
        <div className="text-[70px] mt-[10rem] mx-5 my-5">{name}</div>
        <div className="text-[30px] mx-5 my-5">{life}</div>
        <div className="text-[25px] mx-10 my-5 whitespace-pre-line">{saying.replace(/\./g, '.\n')}</div>
        <div className="my-5">
          <button
            className="w-[200px] h-[70px] border-none text-white text-[20px] text-center bg-cover mb-5 font-semibold mr-5"
            style={{ backgroundImage: `url(${RedBtn})` }}
            onClick={handleConversationClick}
          >
            대화하기
          </button>
          <button
            className="w-[200px] h-[70px] border-none text-white text-[20px] text-center bg-cover font-semibold ml-5"
            style={{ backgroundImage: `url(${BlueBtn})` }}
            onClick={handleQuiz}
          >
            퀴즈풀기
          </button>
        </div>
      </div>
      <ExplanationModal
        isOpen={isModalOpen}
        explanation={explanation}
        onClose={() => setIsModalOpen(false)}
        onNextQuiz={() => movePage(11)}
        onConfirm={handleConfirm} // 추가된 prop
        showConfirmButton={true} // 버튼을 표시하도록 설정
      />
    </>
  );
};

export default GreatPageRight;
