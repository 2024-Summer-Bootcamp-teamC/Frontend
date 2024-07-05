import React, { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import TmpImg from '../assets/images/GreatImgTmp.png';
import Puzzle from '../assets/images/Puzzle.png';
import Clip from '../assets/images/Clip.png';
import Back from '../assets/images/Back.png';

const GreatPageLeft: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [puzzle, setPuzzle] = useState<number>(0);

  useEffect(() => {
    // 외부 데이터에서 가져온 값
    const totalPieces = 4;
    const piecesToFill = 3;
    // 진행 상태 계산
    const calc = (piecesToFill / totalPieces) * 100;
    setProgress(calc);
    setPuzzle(piecesToFill + 1);
  }, []);

  return (
    <>
      <img src={Clip} className="fixed left-[13rem] top-[5rem]" alt="클립 이미지" />
      <div className="flex flex-col items-center justify-cente w-[80%]">
        <img src={TmpImg} className="mb-[6rem] w-[40%]" alt="임시 이미지" />
        <div className="w-[80%]">
          {/* 프로그레스 바 */}
          <div className="w-[100%] grid" style={{ gridTemplateColumns: 'repeat(5, 25%)' }}>
            <div style={{ gridColumn: `${puzzle}` }} className="relative">
              <img
                src={Puzzle}
                alt="임시 이미지"
                className="absolute left-[-1.5rem] top-[-4rem] opacity-0 transition-opacity"
                style={{ opacity: 1 }}
              />
            </div>
          </div>
          <ProgressBar completed={progress} bgColor="white" height="15px" baseBgColor="#88634A" />
          {/* 프로그레스 바 라벨 */}
          <div className="flex text-[#88634A] font-songmyung text-[2rem] justify-between mt-4">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>
      </div>
      <img src={Back} className="fixed bottom-0 left-0" alt="클립 이미지" />
    </>
  );
};

export default GreatPageLeft;
