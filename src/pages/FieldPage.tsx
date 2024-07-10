import React from 'react';
import Newbook from '../assets/Newbook.png'; // 책 이미지 경로 설정
import PoliticalImage from '../assets/Court.png'; // 정치 이미지 경로 설정
import EconomyImage from '../assets/Economy.png'; // 경제 이미지 경로 설정
import ScienceImage from '../assets/Dna.png'; // 과학 이미지 경로 설정
import ArtsImage from '../assets/Palette.png'; // 문화예술 이미지 경로 설정
import BlueBookmark from '../assets/BlueBookmark.png'; // 파란 북마크 이미지 경로 설정
import YellowBookmark from '../assets/YellowBookmark.png'; // 노란 북마크 이미지 경로 설정
import Tape from '../assets/Tape.png'; // 테이프 이미지 경로 설정
import ButtonBg from '../assets/ButtonBg.png'; // 버튼 배경 경로 설정
import Pin from '../assets/Pin2.png'; // 핀 경로 설정
import Back from '../assets/Back.png'; // 뒤로가기 버튼 경로 설정

const FieldPage: React.FC = () => {
  const handleSectionClick = (section: string) => {
    console.log(`${section} section clicked`);
    // React Router를 사용하여 페이지 전환 로직을 추가할 수 있습니다.
  };

  return (
    <div className="absolute" style={{ width: '83vw', height: '92vh' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-center bg-cover" style={{ backgroundImage: `url(${Newbook})`, transform: 'scale(80%) translateY(1%)' }}></div>
        
        {/* 좌측 상단 핀 이미지 및 텍스트 추가 */}
        <div className="absolute top-0 left-0 flex items-center mt-4 ml-4">
          <img src={Pin} alt="핀" style={{ width: '4vw', height: '8vh' }} />
          <div className="ml-2">
            <span className="text-2xl font-bold text-black font-songmyung">위인모음</span>
          </div>
        </div>
        
        {/* 전체 너비 가로선 추가 */}
        <div className="absolute w-full mt-20" style={{ top: '1rem' }}>
          <hr className="border-t-2 border-black" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }} />
        </div>

        <div className="absolute top-0 left-0" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="relative">
            <img src={BlueBookmark} alt="파란북마크" style={{ width: '10vw', height: '9vh', marginTop: '15vh' }} />
            <span className="absolute text-xl font-bold text-black transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-songmyung">분야별</span>
          </div>
          <div className="relative">
            <img src={YellowBookmark} alt="노란북마크" style={{ width: '10vw', height: '9vh', marginBottom: 'vh' }} />
            <span className="absolute text-xl font-bold text-black transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-songmyung">나라별</span>
          </div>
        </div>
        <div className="relative z-10 grid w-2/3 grid-cols-2 gap-8 font-songmyung">
          {/* 박스 크기를 줄이기 위해 padding과 transform 속성을 조정했습니다 */}
          <div className="relative flex items-center justify-center p-3 border cursor-pointer" onClick={() => handleSectionClick('정치')}>
            <img src={ButtonBg} alt="Button Background" className="absolute inset-0 object-cover w-full h-full opacity-50" />
            <img src={PoliticalImage} alt="정치" className="block max-w-full max-h-full transform scale-160" style={{ width: '80%', height: '80%' }} />
            <img src={Tape} alt="Tape" className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2" style={{ width: '60%', height: '130%' }} />
            <span className="absolute top-0 left-0 mt-4 ml-4 text-3xl font-bold">정치</span>
          </div>
          <div className="relative flex items-center justify-center p-3 border cursor-pointer" onClick={() => handleSectionClick('경제')}>
            <img src={ButtonBg} alt="Button Background" className="absolute inset-0 object-cover w-full h-full opacity-50" />
            <img src={EconomyImage} alt="경제" className="block max-w-full max-h-full transform scale-160" style={{ width: '80%', height: '90%' }} />
            <img src={Tape} alt="Tape" className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2" style={{ width: '60%', height: '130%' }} />
            <span className="absolute top-0 left-0 mt-4 ml-4 text-3xl font-bold">경제</span>
          </div>
          <div className="relative flex items-center justify-center p-3 border cursor-pointer" onClick={() => handleSectionClick('과학')}>
            <img src={ButtonBg} alt="Button Background" className="absolute inset-0 object-cover w-full h-full opacity-50" />
            <img src={ScienceImage} alt="과학" className="block max-w-full max-h-full transform scale-80" style={{ width: '40%', height: '80%' }} />
            <img src={Tape} alt="Tape" className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2" style={{ width: '60%', height: '130%' }} />
            <span className="absolute top-0 left-0 mt-4 ml-4 text-3xl font-bold">과학</span>
          </div>
          <div className="relative flex items-center justify-center p-3 border cursor-pointer" onClick={() => handleSectionClick('문화예술')}>
            <img src={ButtonBg} alt="Button Background" className="absolute inset-0 object-cover w-full h-full opacity-50" />
            <img src={ArtsImage} alt="문화예술" className="block max-w-full max-h-full transform scale-100" style={{ width: '50%', height: '90%' }} />
            <img src={Tape} alt="Tape" className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2" style={{ width: '60%', height: '130%' }} />
            <span className="absolute top-0 left-0 mt-4 ml-4 text-3xl font-bold">문화예술</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldPage;
