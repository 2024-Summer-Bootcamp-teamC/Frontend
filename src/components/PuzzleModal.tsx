import React, { useEffect, useState } from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';
import PuzzleModalImage from '../assets/images/PuzzleModalImage.png';
import axios from 'axios';
import { useUserIdStore, useGreatPersonStore, useQuizStore } from '../store';

interface PuzzleModalProps {
  openModal: boolean;
  movePage: (pageNumber: number) => void;
  closeModal: () => void;
  resetQuiz: () => void;
  showGreatList: () => void;
}

const PuzzleModal: React.FC<PuzzleModalProps> = ({ openModal, movePage, closeModal, resetQuiz, showGreatList }) => {
  const { greatId, puzzle_cnt } = useGreatPersonStore();
  const { userId } = useUserIdStore();
  const quizzes = useQuizStore(state => state.quizzes);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    if (!openModal) {
      resetQuiz();
    }
  }, [openModal]);

  useEffect(() => {
    if (quizzes.length >= 20) {
      setIsQuizCompleted(true);
    } else {
      setIsQuizCompleted(false);
    }
  }, [quizzes]);

  if (!openModal) return null;

  const handleAction= async(pageNumber: number) => {
    closeModal();
    try {
      const response = await axios.get(`/api/quizzes/${userId}/${greatId}/`);
      const fetchedQuizzes = response.data;
      useQuizStore.getState().setQuizzes(fetchedQuizzes);
      console.log(fetchedQuizzes);
      movePage(11); 
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
    setTimeout(() => {
      if (pageNumber === 5) {
        showGreatList();
      } else {
        movePage(pageNumber);
      }
    }, 500);
  };

  const handleComplete = () => {
    console.log('Complete button pressed');
    closeModal();
    movePage(7);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative">
        <img src={PuzzleModalImage} alt="모달두루마리" className={`shadow-lg transition-opacity duration-500 ${openModal ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <h1 className="mb-6 mr-16 text-5xl">조각을 하사하노라</h1>
          <div className="relative flex justify-center mb-6">
            <img src={imageSrc} alt="세종대왕" className="my-10 mr-14" />
          </div>
          <div className="text-center">
            {puzzle_cnt===4 ? (
              <button
                className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
                style={{ backgroundImage: `url(${RedBtn})` }}
                onClick={handleComplete}
              >
                완료
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleModal;
