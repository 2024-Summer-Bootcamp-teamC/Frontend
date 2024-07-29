import React, { useEffect, useState } from 'react';
import CorrectStamp from '../assets/images/CorrectStamp.png';
import WrongStamp from '../assets/images/WrongStamp.png';

interface QuizCheckModalProps {
  isOpen: boolean;
  isCorrect: boolean; // 정답 여부를 나타내는 prop 추가
  onClose: () => void;
  onNextQuiz: () => void;
}

const QuizCheckModal: React.FC<QuizCheckModalProps> = ({
  isOpen,
  isCorrect,
  onClose,
  onNextQuiz
}) => {
    
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        if (isOpen) {
          setFadeIn(true); // 모달이 열릴 때 fadeIn 상태를 true로 설정
          setFadeOut(false); // fadeOut 상태를 false로 설정
        } else {
          setFadeIn(false); // 모달이 닫힐 때 fadeIn 상태를 false로 설정
          setFadeOut(true); // fadeOut 상태를 true로 설정
        }
      }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        onNextQuiz();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, onNextQuiz]);

  // 배경 클릭 시, 모달창 사라지도록 하는 기능
  const handleBackgroundClick = () => {
    setFadeOut(true); // 배경 클릭 시 fadeOut 상태를 true로 설정
  };

  if (!isOpen) return null;

  return (
    <div 
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${fadeIn ? 'fade-in' : ''} ${fadeOut ? 'fade-out' : ''}`}
    onClick={handleBackgroundClick} 
    >
      <div className="relative" >
        <img
          src={isCorrect ? CorrectStamp : WrongStamp}
          alt="결과 스탬프"
          className="transition-opacity duration-500"
        />
      </div>
    </div>
  );
  
};

export default QuizCheckModal;
