import React from 'react';
import EconomyImage from '../assets/Economy.png'; // 경제 이미지 경로 설정
import ArtsImage from '../assets/Palette.png'; // 문화예술 이미지 경로 설정
import Tape from '../assets/Tape.png'; // 테이프 이미지 경로 설정

const FieldPageRight: React.FC = () => {
  const handleSectionClick = (section: string) => {
    console.log(`${section} section clicked`);
    // React Router를 사용하여 페이지 전환 로직을 추가할 수 있습니다.
  };

  return (
    <div className="absolute w-[100%] h-[80vh]">
      <div className="absolute w-[110%] h-[100%] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-12">
            {[
              { label: '경제', image: EconomyImage },
              { label: '문화예술', image: ArtsImage }
            ].map((section) => (
              <div
                key={section.label}
                className="relative flex items-center justify-center p-3 cursor-pointer group right-11"
                onClick={() => handleSectionClick(section.label)}
                style={{ width: '470px', height: '280px', pointerEvents: 'fill' }} // 컨테이너 크기 고정
              >
                <img 
                  src={section.image} 
                  alt={section.label} 
                  className="block object-cover w-full h-full transition-opacity duration-200 opacity-50 group-hover:opacity-100" // 이미지 조정 및 투명도 조정
                />
                <img src={Tape} alt="Tape" className="absolute top-3 w-[75%] h-[150%] transform -translate-x-1/2 -translate-y-1/2 left-1/2 pointer-events-none" style={{ opacity: 1 }} />
                <span className="absolute text-5xl pointer-events-none top-11 left-12" style={{ opacity: 1 }}>{section.label}</span> {/* 위치 조정 */}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default FieldPageRight;
