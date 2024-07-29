import React, { useEffect } from 'react';
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
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
