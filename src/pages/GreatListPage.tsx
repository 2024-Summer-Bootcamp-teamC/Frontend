import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardFront from '../components/CardFront';
import CardBack from '../components/CardBack';
import ReactCardFlip from 'react-card-flip';

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
}

const GreatListPage: React.FC<CardProps> = ({ movePage }) => {
  const [greatPersons, setGreatPersons] = useState<GreatPerson[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  useEffect(() => {
    const fetchGreatPersons = async () => {
      try {
        const response = await axios.get('/api/greats/1/'); // 적절한 user_id로 교체
        setGreatPersons(response.data);
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentPersons = greatPersons.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 scale-90">
      <div className="grid grid-cols-2 gap-4">
        {currentPersons.map((person, index) => (
          <div
            key={person.greatId}
            className="flex justify-center w-full"
            onMouseEnter={() => handleFlip(startIndex + index)}
            onMouseLeave={() => handleFlip(startIndex + index)}
            onClick={() => movePage(7)}
          >
            <div className="max-w-[200px] max-h-[300px]">
              <ReactCardFlip isFlipped={isFlipped[startIndex + index]} flipDirection="horizontal">
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
      <div className="flex justify-between w-full mt-4">
        {currentPage > 0 && <button onClick={handlePrevPage}>이전</button>}
        {endIndex < greatPersons.length && <button onClick={handleNextPage}>다음</button>}
      </div>
    </div>
  );
};

export default GreatListPage;
