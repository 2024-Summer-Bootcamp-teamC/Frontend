import React, { useState } from 'react';
import axios from 'axios';
import EmptyPuzzle from '../assets/images/EmptyPuzzle.png';
import FilledPuzzle from '../assets/images/Puzzle.png';
import ExplanationModal from '../components/ExplanationModal';
import QuizCheckModal from '../components/QuizCheckModal'; // Import QuizCheckModal
import { useQuizStore, useUserIdStore, useGreatPersonStore } from '../store';

interface GreatQuizPageRightProps {
  movePage: (pageNumber: number) => void;
  currentPage: number;
  onComplete?: () => void;
  showPuzzleModal?: () => void;
}

const GreatQuizPageRight: React.FC<GreatQuizPageRightProps> = ({ movePage, showPuzzleModal }) => {
  const { quizzes } = useQuizStore();
  const { userId } = useUserIdStore();
  const { greatId, setPuzzleCount, puzzle_cnt } = useGreatPersonStore(); 
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [correctCnt, setCorrectCnt] = useState(0);
  const [isLastQuiz, setIsLastQuiz] = useState(false);
  const [isQuizCheckModalOpen, setIsQuizCheckModalOpen] = useState(false); 
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false); // Add state for answer correctness

  const currentQuiz = quizzes.length > 0 ? quizzes[currentQuizIndex] : null;

  if (!currentQuiz) {
    return <div>문제를 준비중입니다..</div>;
  }

  const handleOptionClick = async (option: string) => {
    setSelectedOption(option);
  
    if (option === currentQuiz.answer) {
      const newCorrectCnt = correctCnt + 1;
      setCorrectCnt(newCorrectCnt);
      setIsCorrectAnswer(true); // 정답으로 표시
  
      const newPuzzleCount = (currentQuizIndex + 1) % 5 === 0 ? puzzle_cnt + 1 : puzzle_cnt;
  
      if ((currentQuizIndex + 1) % 5 === 0) {
        setPuzzleCount(newPuzzleCount);
        updatePuzzleCount(newCorrectCnt);
  
        if (showPuzzleModal) {
          showPuzzleModal();
        }
        resetQuiz();
      }
    } else {
      setCurrentExplanation(currentQuiz.explanation);
      setIsCorrectAnswer(false); // 오답으로 표시
      if ((currentQuizIndex + 1) % 5 === 0) {
        setIsLastQuiz(true);
      }
    }
  
    // 정답이든 오답이든 QuizCheckModal을 열도록 수정
    setIsQuizCheckModalOpen(true);
  };
  

  const updatePuzzleCount = async (correctCnt: number) => {
    try {
      const response = await axios.put(`/api/quizzes/${greatId}/puzzles/`, {
        user_id: userId,
        correct_cnt: correctCnt,
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

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedOption(null);
    } else {
      movePage(12);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setCorrectCnt(0);
  };

  const handleCloseExplanationModal = () => {
    setIsModalOpen(false);
    if (isLastQuiz) {
      const newPuzzleCount = puzzle_cnt + 1;
      setPuzzleCount(newPuzzleCount);
      updatePuzzleCount(correctCnt);
      if (showPuzzleModal) {
        showPuzzleModal();
      }
      resetQuiz(); 
      setIsLastQuiz(false);
    } else {
      handleNextQuiz();
    }
  };

  const handleQuizCheckModalClose = () => {
    setIsQuizCheckModalOpen(false);
    if (isCorrectAnswer) {
      handleNextQuiz(); // 정답인 경우 다음 퀴즈로 이동
    } else {
      setIsModalOpen(true); // 오답인 경우 ExplanationModal 열기
    }
  };
  
  
  const puzzlePieces = [...Array(4)].map((_, index) => (
    <img
      key={index}
      src={index < puzzle_cnt ? FilledPuzzle : EmptyPuzzle}
      className="w-10 h-10 mx-1"
      alt="퍼즐 조각"
    />
  ));

  return (
    <div className="relative h-[700px]">
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 mt-[40px]">
        <div className="flex justify-center mb-4">{puzzlePieces}</div>
        <div className="w-[500px] h-[1px] bg-black"></div>
      </div>
      <div className="flex flex-col justify-center mt-24 h-[calc(100%-100px)] overflow-y-auto">
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
        </div>
      </div>
      <ExplanationModal
        isOpen={isModalOpen}
        explanation={currentExplanation}
        onClose={handleCloseExplanationModal}
        onNextQuiz={handleNextQuiz}
      />


      {isQuizCheckModalOpen && (
        <QuizCheckModal
          isOpen={isQuizCheckModalOpen}
          isCorrect={isCorrectAnswer} // 정답 여부를 QuizCheckModal에 전달
          onClose={handleQuizCheckModalClose} // QuizCheckModal이 닫힐 때 호출할 함수
          onNextQuiz={() => {}} // 현재는 빈 함수로 설정
        />
      )}
    </div>
  );
};

export default GreatQuizPageRight;
