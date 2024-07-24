import React, { useState } from 'react';
import Vector from '../assets/Vector.png';
import { useTriggerChartStore } from '../store';
import Power from '../assets/Power.png';

interface NavBarProps {
  movePage: (pageNumber: number) => void;
  curPage: number; // 현재 페이지 상태를 prop으로 추가
}

const NavBar: React.FC<NavBarProps> = ({ movePage, curPage }) => {
  const [isHoveredLogout, setIsHoveredLogout] = useState(false);
  const [isHoveredChart, setIsHoveredChart] = useState(false);
  const { setCount } = useTriggerChartStore();

  const handleClick = () => {
    movePage(13);
    setCount();
  };

  // curPage가 0일 때 NavBar의 특정 부분을 숨기도록 설정
  const hideNavBarContent = curPage === 0 ? 'hidden' : '';

  return (
    <div className="fixed top-0 left-0 right-0 z-10 w-full" style={{ height: '50px' }}>
      <nav className={`border-b-[2.5px] border-black h-full ${hideNavBarContent}`}>
        <div className="container relative h-full mx-auto">
          <div
            className={`absolute left-[-100px] top-[-7px] flex items-center gap-2.5 cursor-pointer hover:font-bold p-4 ${hideNavBarContent}`}
            style={{ fontSize: '20px' }}
            onClick={() => movePage(0)}
            onMouseEnter={() => setIsHoveredLogout(true)}
            onMouseLeave={() => setIsHoveredLogout(false)}
          >
            {isHoveredLogout ? <span>로그아웃</span> : <img src={Power} alt="Profile" className="w-[30px] h-[30px]" />}
          </div>
          <div className="flex items-center justify-center">
            <div className="text-[20px] font-bold">We in</div>
            <img src="images/jeon.png" className="w-[57px] h-[45px]" alt="Logo" />
          </div>
          <div
            className={`absolute right-[-100px] top-[-7px] flex items-center gap-2.5 cursor-pointer hover:font-bold p-4 ${hideNavBarContent}`}
            style={{ fontSize: '20px' }}
            onClick={handleClick}
            onMouseEnter={() => setIsHoveredChart(true)}
            onMouseLeave={() => setIsHoveredChart(false)}
          >
            {isHoveredChart ? <span>차트</span> : <img src={Vector} alt="Profile" className="w-[33px] h-[29px]" />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
