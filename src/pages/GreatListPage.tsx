import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardFront from '../components/CardFront';
import CardBack from '../components/CardBack';
import ReactCardFlip from 'react-card-flip';
import { useUserIdStore, useGreatPersonStore } from '../store';
import '../index.css'; // CSS 파일을 추가하여 애니메이션 효과를 적용
import { GreatPerson } from '../types';

interface GreatModalProps {
  closeModal: () => void; // 모달 닫기 함수 추가
  movePage: (pageNumber: number) => void;
  
}  

const GreatModal: React.FC<GreatModalProps> = ({ closeModal, movePage }) => {
  const [greatPersons, setGreatPersons] = useState<GreatPerson[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const { userId } = useUserIdStore();
  const { setGreat, setLife, setVideo_url } = useGreatPersonStore();

  useEffect(() => {
    const fetchGreatPersons = async () => {
      try {
        const response = await axios.get(`/api/greats/${userId}/`);
        setGreatPersons(response.data);
        console.log(response.data);
        setIsFlipped(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching great persons:', error);
      }
    };

    fetchGreatPersons();
  }, [userId]);

  const handleFlip = (index: number) => {
    setIsFlipped((prevState) => {
      const newFlipped = [...prevState];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleCardClick = (person: GreatPerson) => {
    closeModal();
    setGreat(person);

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/greats/${userId}/${person.greatId}/`);
        console.log(response.data);
        setLife(response.data.life);
        setVideo_url(response.data.video_url);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    setTimeout(() => {
      fetchData();

      movePage(7);
    }, 500); // 모달 닫힌 후 0.5초 후에 페이지 이동
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 p-4 overflow-auto bg-white rounded-lg h-3/4">
        <button
          className="absolute top-0 right-0 m-4 text-2xl font-bold text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 scale-90">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {greatPersons.map((person, index) => (
              <div
                key={person.greatId}
                className={`flex justify-center w-full animate-card-enter delay-${index}`}
                onMouseEnter={() => handleFlip(index)}
                onMouseLeave={() => handleFlip(index)}
                onClick={() => handleCardClick(person)}
              >
                <div className="max-w-[200px] max-h-[300px] ml-12 mr-12 mt-[75px]">
                  <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                    <CardFront key={`front${person.greatId}`} name={person.name} image={person.front_url} />
                    <CardBack
                      key={`back${person.greatId}`}
                      name={person.name}
                      saying_url={person.saying_url}
                      category={`${person.nation}/${person.field}`}
                      image={person.back_url}
                    />
                  </ReactCardFlip>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreatModal;
