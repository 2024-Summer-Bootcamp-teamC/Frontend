import React, { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Puzzle from '../assets/images/Puzzle.png';

import { useGreatPersonStore } from '../store';

const GreatPageLeft: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [puzzle, setPuzzle] = useState<number>(0);
  const [key, setKey] = useState<number>(Date.now());

  const { greatId, photo_url, puzzle_cnt } = useGreatPersonStore();

  useEffect(() => {
    // 진행 상태 계산
    const totalPieces = 4; // 전체 퍼즐 조각 수
    const piecesToFill = Number(puzzle_cnt); // 채워진 퍼즐 조각 수
    const calc = (piecesToFill / totalPieces) * 100;
    setProgress(calc);
    setPuzzle(piecesToFill + 1);
    setKey(Date.now());
  }, [greatId]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[80%]">
        {/* 이미지 */}
        <img src={photo_url} className="mb-[6rem] w-[60%]" alt="위인 사진" />
        <div className="w-[80%]">
          {/* 프로그레스 바 */}
          <div className="w-[100%] grid" style={{ gridTemplateColumns: 'repeat(5, 25%)' }}>
            <div style={{ gridColumn: `${puzzle}` }} className="relative">
              {/* 퍼즐 이미지 */}
              <img
                src={Puzzle} // Puzzle 이미지 대신 greatPerson.quote에 해당하는 이미지 URL 사용
                alt="퍼즐 이미지"
                key={key}
                className="absolute left-[-1.5rem] top-[-4rem] transition-opacity duration-[5000ms] opacity-0"
                style={{ opacity: 1 }}
              />
            </div>
          </div>
          {/* 프로그레스 바 */}
          <ProgressBar completed={progress} bgColor="white" height="5px" baseBgColor="#88634A" />
          {/* 프로그레스 바 라벨 */}
          <div className="flex text-[#88634A] text-[20px] justify-between mt-4">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GreatPageLeft;
