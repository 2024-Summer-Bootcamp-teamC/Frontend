import React from 'react';
import Newbook from '../assets/Newbook.png'; // 책 이미지 경로 설정
import PoliticalImage from '../assets/Court.png'; // 정치 이미지 경로 설정
import EconomyImage from '../assets/Economy.png'; // 경제 이미지 경로 설정
import ScienceImage from '../assets/Dna.png'; // 과학 이미지 경로 설정
import ArtsImage from '../assets/Palette.png'; // 문화예술 이미지 경로 설정
import Tape from '../assets/Tape.png'; // 테이프 이미지 경로 설정
import BackImage from '../assets/Back.png'; // 뒤로가기 버튼 경로 설정

const FieldPage: React.FC = () => {
  const handleSectionClick = (section: string) => {
    console.log(`${section} section clicked`);
    // React Router를 사용하여 페이지 전환 로직을 추가할 수 있습니다.
  };

  return (
    <div className="absolute w-[71vw] h-[80vh]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 z-0 translate-y-1 bg-center bg-cover scale-80" style={{ backgroundImage: `url(${Newbook})` }}></div>

        <div className="relative z-10 grid w-2/3 grid-cols-2 gap-20 left-6">
          {[
            { label: '정치', image: PoliticalImage },
            { label: '경제', image: EconomyImage },
            { label: '과학', image: ScienceImage },
            { label: '문화예술', image: ArtsImage }
          ].map((section) => (
            <div
              key={section.label}
              className="relative flex items-center justify-center p-3 cursor-pointer group"
              onClick={() => handleSectionClick(section.label)}
              style={{ width: '540px', height: '300px', pointerEvents: 'fill' }} // 컨테이너 크기 고정, 가로 길이 2배로 증가
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
        
        {/* 뒤로가기 버튼 추가 */}
        <div className="absolute mb-10 ml-20 left-1 bottom-3">
          <img
            src={BackImage}
            alt="뒤로가기"
            className="h-20 transition-opacity duration-300 opacity-50 cursor-pointer w-15 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};

export default FieldPage;
