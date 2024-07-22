import React, { useEffect, useState } from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';

interface PuzzleModalProps {
  openModal: boolean;
  movePage: (pageNumber: number) => void;
  closeModal: () => void;
}


const PuzzleModal: React.FC<PuzzleModalProps> = ({ openModal, movePage, closeModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(openModal); // Use the openModal prop to control visibility
  }, [openModal]);

  if (!openModal) return null;

  const handleContinue = () => {
    setIsVisible(false);
    closeModal();
    setTimeout(() => {
      movePage(12);
    }, 500); // 500ms delay to allow closeModal to execute first
  };

  const handleCardList = () => {
    setIsVisible(false);
    closeModal();
    setTimeout(() => {
      movePage(5);
    }, 500); // 500ms delay to allow closeModal to execute first
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="mb-6 text-5xl text-center">퍼즐획득!</h1>
        <div className="relative flex justify-center mb-6">
          <img src={imageSrc} alt="세종대왕" className="my-10" />
        </div>
        <div className="text-center">
          <button
            className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
            style={{ backgroundImage: `url(${RedBtn})` }}
            onClick={handleContinue}
          >
            이어서 풀기
          </button>
          <button
            className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
            style={{ backgroundImage: `url(${BlueBtn})` }}
            onClick={handleCardList}
          >
            카드 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuzzleModal;
