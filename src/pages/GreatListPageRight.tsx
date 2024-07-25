import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardFront from '../components/CardFront';
import CardBack from '../components/CardBack';
import ReactCardFlip from 'react-card-flip';
import { useUserIdStore, useGreatPersonStore, useCardStore } from '../store';
import '../index.css'; // 애니메이션 효과를 위한 CSS 파일
import { GreatPerson } from '../types';

interface CardProps {
  movePage: (pageNumber: number) => void;
}

const GreatListPageRight: React.FC<CardProps> = ({ movePage }) => {
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const { userId } = useUserIdStore();
  const { setGreat, setLife, setVideo_url, setInfo } = useGreatPersonStore();
  const { setCards, rightCards } = useCardStore(); // 카드 스토어 사용

  const [isClickable, setIsClickable] = useState(false); // 클릭 가능 여부 상태 추가

  useEffect(() => {
    // const fetchGreatPersons = async () => {
    //   try {
    //     const response = await axios.get(`/api/greats/${userId}/`);
    //     // 카드 분리
    //     setCards(response.data);
    //   } catch (error) {
    //     console.error('위대한 인물 정보를 가져오는 중 오류 발생:', error);
    //   }
    // };

    // fetchGreatPersons();

    // 모달이 뜬 후 2초 동안 클릭 불가
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 300);
    setIsFlipped(new Array(rightCards.length).fill(false));
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [userId, setCards]);

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
    const fetchData2 = async () => {
      try {
        const response2 = await axios.get(`/api/greats/${userId}/`);
        setCards(response2.data);
      } catch {
        console.error('카드세팅에러');
      }
    };

    setTimeout(() => {
      fetchData2();
    }, 1000);
  };

  // 오른쪽 카드 필터링

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 scale-90">
      <div
        className="grid grid-cols-2 gap-4 animate-card-enter"
        style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
      >
        {rightCards.map((person, index) => (
          <div
            key={person.greatId}
            className={`flex justify-center delay-${index}`}
            onMouseEnter={() => handleFlip(index)}
            onMouseLeave={() => handleFlip(index)}
            onClick={() => handleCardClick(person)}
          >
            <div className="card-container max-w-[200px] max-h-[300px]">
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

export default GreatListPageRight;
