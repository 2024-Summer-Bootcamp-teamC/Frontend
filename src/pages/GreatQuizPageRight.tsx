import React, { useState } from 'react';
import { useQuizStore } from '../store';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';

const GreatQuizPageRight: React.FC<{ movePage: (pageNumber: number) => void }> = ({ movePage }) => {
  const { quizzes } = useQuizStore();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (quizzes.length === 0) {
    return <div>No quizzes available.</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedOption(null);
    } else {
      movePage(12); // Navigate to the completion page or another page
    }
  };

  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="relative h-[700px]">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[40px]">
        <div className="w-[500px] h-[1px] bg-black"></div>
      </div>
      <div className="flex flex-col items-center mt-[100px] h-[calc(100%-100px)] overflow-y-auto">
        <div className="text-[25px] flex flex-col mb-8 leading-tight max-w-md break-words text-center">
          <span>{currentQuiz.question}</span>
        </div>
        <div className="w-[448px]">
          <div
            className={`border border-black rounded-md text-[20px] mb-1 p-2 text-center cursor-pointer ${
              selectedOption === 'O' ? 'bg-amber-950 text-white' : 'hover:bg-amber-950 hover:text-white'
            }`}
            onClick={() => handleOptionClick('O')}
          >
            O
          </div>
          <div
            className={`border border-black rounded-md text-[20px] mt-1 p-2 text-center cursor-pointer ${
              selectedOption === 'X' ? 'bg-amber-950 text-white' : 'hover:bg-amber-950 hover:text-white'
            }`}
            onClick={() => handleOptionClick('X')}
          >
            X
          </div>
        </div>
        <div className="flex justify-center mt-24">
          {currentQuizIndex > 0 && (
            <button
              className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
              style={{ backgroundImage: `url(${RedBtn})` }}
              onClick={handlePreviousQuiz}
            >
              이전 문제
            </button>
          )}
          <button
            className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
            style={{ backgroundImage: `url(${BlueBtn})` }}
            onClick={handleNextQuiz}
          >
            다음 문제
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreatQuizPageRight;
