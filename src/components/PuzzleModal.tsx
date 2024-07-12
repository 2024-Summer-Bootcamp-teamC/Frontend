import React from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';

interface PuzzleModalProps {
  movePage: (pageNumber: number) => void;
  closeModal: () => void;
}

const PuzzleModal: React.FC<PuzzleModalProps> = ({ movePage, closeModal }) => {
  const handleContinue = () => {
    closeModal();
    setTimeout(() => {
      movePage(12);
    }, 300); // 300ms 딜레이를 주어 closeModal이 먼저 실행되도록 함
  };

  const handleCardList = () => {
    closeModal();
    setTimeout(() => {
      movePage(5);
    }, 300); // 300ms 딜레이를 주어 closeModal이 먼저 실행되도록 함
  };

  return (
    <div className="w-4/5 p-6 mx-auto rounded-lg shadow-lg">
      <h1 className="text-5xl text-center">퍼즐획득!</h1>
      <div className="relative flex justify-center mb-6">
        <img src={imageSrc} alt="세종대왕" className="my-10"></img>
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
  );
};

export default PuzzleModal;
