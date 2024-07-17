import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardFront from '../components/CardFront';
import CardBack from '../components/CardBack';
import ReactCardFlip from 'react-card-flip';
import '../index.css'; // CSS 파일을 추가하여 애니메이션 효과를 적용

interface GreatPerson {
  greatId: number;
  name: string;
  silhouette_url: string;
  photo_url: string;
  saying: string;
  puzzle_cnt: number;
}

interface CardProps {
  movePage: (pageNumber: number) => void;
  closeModal: () => void; // 모달 닫기 함수 추가
}

const GreatListPage: React.FC<CardProps> = ({ movePage, closeModal }) => {
  const [greatPersons, setGreatPersons] = useState<GreatPerson[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchGreatPersons = async () => {
      try {
        const response = await axios.get('/api/greats/1/'); // 적절한 user_id로 교체
        setGreatPersons(response.data);
        console.log(response.data);
        setIsFlipped(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching great persons:', error);
      }
    };

    fetchGreatPersons();
  }, []);

  const handleFlip = (index: number) => {
    setIsFlipped((prevState) => {
      const newFlipped = [...prevState];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleCardClick = () => {
    closeModal();
    setTimeout(() => {
      movePage(7);
    }, 500); // 모달 닫힌 후 0.5초 후에 페이지 이동
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 scale-90">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {greatPersons.map((person, index) => (
          <div
            key={person.greatId}
            className={`flex justify-center w-full animate-card-enter delay-${index}`}
            onMouseEnter={() => handleFlip(index)}
            onMouseLeave={() => handleFlip(index)}
            onClick={handleCardClick}
          >
            <div className="max-w-[200px] max-h-[300px] ml-12 mr-12 mt-[75px]">
              <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                <CardFront key={`front${person.greatId}`} name={person.name} image={person.photo_url} />
                <CardBack
                  key={`back${person.greatId}`}
                  name={person.name}
                  saying={person.saying}
                  category="한국/정치"
                  image={person.photo_url}
                />
              </ReactCardFlip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreatListPage;
