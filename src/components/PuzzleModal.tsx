import React, { useEffect } from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';

interface PuzzleModalProps {
  openModal: boolean;
  movePage: (pageNumber: number) => void;
  closeModal: () => void;
}

const PuzzleModal: React.FC<PuzzleModalProps> = ({ openModal, movePage, closeModal }) => {
  // No need for local visibility state if using openModal directly
  useEffect(() => {
    if (!openModal) {
      // Handle any additional logic when modal is closed if needed
    }
  }, [openModal]);

  // Conditionally render the modal based on openModal prop
  if (!openModal) return null;

  const handleAction = (pageNumber: number) => {
    closeModal();
    setTimeout(() => {
      movePage(pageNumber);
    }, 500); // 500ms delay to allow closeModal to execute
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transition-opacity duration-500 ${openModal ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="mb-6 text-5xl text-center">퍼즐 획득!</h1>
        <div className="relative flex justify-center mb-6">
          <img src={imageSrc} alt="세종대왕" className="my-10" />
        </div>
        <div className="text-center">
          <button
            className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
            style={{ backgroundImage: `url(${RedBtn})` }}
            onClick={() => handleAction(12)}
          >
            이어서 풀기
          </button>
          <button
            className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
            style={{ backgroundImage: `url(${BlueBtn})` }}
            onClick={() => handleAction(5)}
          >
            카드 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuzzleModal;
