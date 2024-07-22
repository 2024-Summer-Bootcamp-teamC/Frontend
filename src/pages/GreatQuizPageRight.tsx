import React, { useState } from 'react';
import axios from 'axios';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';
import EmptyPuzzle from '../assets/images/EmptyPuzzle.png';
import FilledPuzzle from '../assets/images/Puzzle.png';
import ExplanationModal from '../components/ExplanationModal';
import { useQuizStore, useUserIdStore, useGreatPersonStore } from '../store';

interface GreatQuizPageRightProps {
  movePage: (pageNumber: number) => void;
  currentPage: number;
  onComplete?: () => void;
  showPuzzleModal?: () => void; // Add this prop
}

const GreatQuizPageRight: React.FC<GreatQuizPageRightProps> = ({ movePage, currentPage, onComplete, showPuzzleModal }) => {
  const { quizzes } = useQuizStore();
  const { userId } = useUserIdStore();
  const { greatId } = useGreatPersonStore();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [puzzleCount, setPuzzleCount] = useState(0);

  if (quizzes.length === 0) {
    return <div>헉 문제 없음</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  const handleOptionClick = async (option: string) => {
    setSelectedOption(option);

    if (option === currentQuiz.answer) {
      const newPuzzleCount = (currentQuizIndex + 1) % 5 === 0 ? puzzleCount + 1 : puzzleCount;
      
      if ((currentQuizIndex + 1) % 5 === 0) {
        setPuzzleCount(newPuzzleCount);
        updatePuzzleCount(newPuzzleCount);

        if (showPuzzleModal) {
          showPuzzleModal(); // Trigger PuzzleModal
        }
      }

      handleNextQuiz();
    } else {
      setCurrentExplanation(currentQuiz.explanation);
      setIsModalOpen(true);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedOption(null);
    } else {
      movePage(12);
    }
  };

  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setSelectedOption(null);
    }
  };

  const updatePuzzleCount = async (count: number) => {
    try {
      const response = await axios.put(`/quizzes/${greatId}/puzzles/`, {
        userId,
        puzzle_cnt: count
      });
      console.log('Updated puzzle count:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating puzzle count:', error.message);
        console.error('Error details:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const puzzlePieces = [...Array(4)].map((_, index) => (
    <img
      key={index}
      src={index < puzzleCount ? FilledPuzzle : EmptyPuzzle}
      className="w-10 h-10 mx-1"
      alt="퍼즐 조각"
    />
  ));

  return (
    <div className="relative h-[700px]">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[40px]">
        <div className="flex justify-center mb-3">{puzzlePieces}</div>
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
          {currentPage === 12 || currentPage === 14 ? (
            <button
              className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
              style={{ backgroundImage: `url(${BlueBtn})` }}
              onClick={handleNextQuiz}
            >
              다음 문제
            </button>
          ) : null}
          {currentPage === 16 ? (
            <button
              className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
              style={{ backgroundImage: `url(${BlueBtn})` }}
              onClick={onComplete}
            >
              완료
            </button>
          ) : null}
        </div>
      </div>
      <ExplanationModal
        isOpen={isModalOpen}
        explanation={currentExplanation}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default GreatQuizPageRight;
