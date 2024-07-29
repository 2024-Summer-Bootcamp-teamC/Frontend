import React, { useEffect } from 'react';
import imageSrc from '../assets/images/sejong.png';
import RedBtn from '../assets/images/PuzzleCardRedBtn.png';
import BlueBtn from '../assets/images/PuzzleCardBlueBtn.png';
import PuzzleModalImage from '../assets/images/PuzzleModalImage.png';
import axios from 'axios';
import { useUserIdStore, useGreatPersonStore, useQuizStore } from '../store';
import lss1 from '../assets/images/Lss1.png';
import lss2 from '../assets/images/Lss2.png';
import lss3 from '../assets/images/Lss3.png';
import lss4 from '../assets/images/Lss4.png';


interface PuzzleModalProps {
  openModal: boolean;
  movePage: (pageNumber: number) => void;
  closeModal: () => void;
  resetQuiz: () => void;
  showGreatList: () => void;
}

const PuzzleModal: React.FC<PuzzleModalProps> = ({ openModal, movePage, closeModal, resetQuiz, showGreatList }) => {
  const { greatId, puzzle_cnt, name } = useGreatPersonStore();
  const { userId } = useUserIdStore();
  // const quizzes = useQuizStore(state => state.quizzes);
  // const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    if (!openModal) {
      resetQuiz();
    }
  }, [openModal]);

  // useEffect(() => {
  //   if (quizzes.length >= 20) {
  //     setIsQuizCompleted(true);
  //   } else {
  //     setIsQuizCompleted(false);
  //   }
  // }, [quizzes]);

  if (!openModal) return null;

  const handleAction = async (pageNumber: number) => {
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

  const getImageSrc = () => {
    if (name === "이순신") {
      switch (puzzle_cnt) {
        case 1:
          return lss1;
        case 2:
          return lss2;
        case 3:
          return lss3;
        case 4:
          return lss4;
        default:
          return imageSrc;
      }
    }
    return imageSrc;
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative">
        <img src={PuzzleModalImage} alt="모달두루마리" className={`shadow-lg transition-opacity duration-500 ${openModal ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {puzzle_cnt <= 4 ? (
            <>
              <h1 className="mb-6 mr-16 text-5xl">조각을 하사하노라</h1>
              <div className="relative flex justify-center mb-6">
                <img src={getImageSrc()} alt="세종대왕" className="w-48 my-10 -rotate-12 mr-14" />
              </div>
              <div className="text-center">
                {puzzle_cnt === 4 ? (
                  <button
                    className="h-20 mx-4 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
                    style={{ backgroundImage: `url(${RedBtn})` }}
                    onClick={() => handleAction(7)}
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
            </>
          ) : (
            <>
              <h1 className="mb-6 text-5xl">Next Stage</h1>
              <button
                className="h-20 text-2xl font-bold text-white bg-center bg-no-repeat bg-cover w-52"
                style={{ backgroundImage: `url(${RedBtn})` }}
                onClick={() => handleAction(12)}
              >
                Next Stage
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
  );
};

export default PuzzleModal;
