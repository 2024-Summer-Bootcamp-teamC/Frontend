import React from 'react';
import PoliticalImage from '../assets/Court.png'; // 정치 이미지 경로 설정
import ScienceImage from '../assets/Dna.png'; // 과학 이미지 경로 설정
import Tape from '../assets/Tape.png'; // 테이프 이미지 경로 설정
import { useParamStore, useGreatListStore } from '../store';

interface Props {
  movePage: (pageNumber: number) => void;
}

const FieldPageLeft: React.FC<Props> = ({ movePage }) => {
  const { setShowGreatList } = useGreatListStore();
  const { setParam, setField } = useParamStore();

  const handleSectionClick = (section: string) => {
    console.log(`${section} section clicked`);
    setParam({ field: section });
    setField(true);
    // React Router를 사용하여 페이지 전환 로직을 추가할 수 있습니다.
    movePage(5);
    setShowGreatList(true);
  };

  return (
    <div className="absolute w-[120%] h-[110%] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12">
        {[
          { label: '정치', image: PoliticalImage },
          { label: '과학', image: ScienceImage },
        ].map((section) => (
          <div
            key={section.label}
            className="relative flex items-center justify-center p-3 ml-8 cursor-pointer group" // 여기서 ml-8을 사용하여 오른쪽으로 이동
            onClick={() => handleSectionClick(section.label)}
            style={{ width: '470px', height: '280px' }} // 컨테이너 크기 고정
          >
            <img
              src={section.image}
              alt={section.label}
              className="block object-cover w-full h-full transition-opacity duration-200 opacity-50 group-hover:opacity-100" // 이미지 조정 및 투명도 조정
              style={{ pointerEvents: 'none' }} // 이미지 자체는 클릭 이벤트를 방해하지 않도록 설정
            />
            <img
              src={Tape}
              alt="Tape"
              className="absolute top-3 w-[75%] h-[150%] transform -translate-x-1/2 -translate-y-1/2 left-1/2 pointer-events-none"
              style={{ opacity: 1 }}
            />
            <span className="absolute text-[30px] pointer-events-none top-11 left-12" style={{ opacity: 1 }}>
              {section.label}
            </span>{' '}
            {/* 위치 조정 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldPageLeft;
