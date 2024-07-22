import React, { useState } from 'react';
import Vector from '../assets/Vector.png';
import { useTriggerChartStore } from '../store';
import Power from '../assets/Power.png';

interface NavBarProps {
  movePage: (pageNumber: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ movePage }) => {
  const [isHoveredLogout, setIsHoveredLogout] = useState(false);
  const [isHoveredChart, setIsHoveredChart] = useState(false);
  const { setCount } = useTriggerChartStore();

  const handleClick = () => {
    movePage(17);
    setCount();
  };

  return (
    <div className="fixed left-0 right-0 top-0 w-full z-10">
      <nav className="border-b-[2.5px] border-black">
        <div className="container mx-auto relative">
          <div
            className="absolute left-[-100px] top-[-7px] flex items-center gap-2.5 cursor-pointer hover:font-bold p-4"
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
            className="absolute right-[-100px] top-[-7px] flex items-center gap-2.5 cursor-pointer hover:font-bold p-4"
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
