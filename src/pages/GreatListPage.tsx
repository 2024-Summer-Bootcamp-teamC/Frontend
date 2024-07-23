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
  const { setGreat, setLife, setVideo_url, setInfo } = useGreatPersonStore();
  const [isClickable, setIsClickable] = useState(false); // 클릭 가능 여부 상태 추가

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

    // 모달이 뜬 후 2초 동안 클릭 불가
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 300);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  const handleFlip = (index: number) => {
    if (!isClickable) return; // 클릭 불가 시 아무 작업도 하지 않음
    setIsFlipped((prevState) => {
      const newFlipped = [...prevState];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleCardClick = (person: GreatPerson) => {
    if (!isClickable) return; // 클릭 불가 시 아무 작업도 하지 않음
    closeModal();
    setGreat(person);

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/greats/${userId}/${person.greatId}/`);

        setLife(response.data.life);
        setVideo_url(response.data.video_url);
        setInfo(response.data.information_url);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    movePage(7);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 scale-90">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ pointerEvents: isClickable ? 'auto' : 'none' }}>
        {greatPersons.map((person, index) => (
          <div
            key={person.greatId}
            className={`flex justify-center w-full animate-card-enter delay-${index}`}
            onMouseEnter={() => handleFlip(index)}
            onMouseLeave={() => handleFlip(index)}
            onClick={() => handleCardClick(person)}
          >
            <div className="card-container max-w-[200px] max-h-[300px] ml-12 mr-12 mt-[75px]">
              <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                <div className="card-size">
                  <CardFront key={`front${person.greatId}`} name={person.name} image={person.front_url} />
                </div>
                <div className="card-size">
                  <CardBack
                    key={`back${person.greatId}`}
                    name={person.name}
                    saying_url={person.saying_url}
                    category={`${person.nation}/${person.field}`}
                    image={person.back_url}
                  />
                </div>
              </ReactCardFlip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreatModal;
