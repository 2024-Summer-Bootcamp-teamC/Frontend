import React, { useState } from 'react';
import Pin from '../assets/images/Pin.png';
import Vector from '../assets/Vector.png';

interface NavBarProps {
  movePage: (pageNumber: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ movePage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed left-0 right-0 w-full top-14" style={{ height: '1px' }}>
      <nav className="border-b border-black">
        <div className="container mx-auto">
          <div
            className="fixed top-2 left-6 flex items-center gap-2.5 cursor-pointer hover:font-bold hover:underline"
            onClick={() => movePage(5)}
          >
            <img src={Pin} alt="PinImage" />
            <div style={{ fontSize: '30px' }}> 위인 모음 </div>
          </div>
          <div
            className="fixed cursor-pointer top-2 right-7 hover:font-bold hover:underline"
            style={{ fontSize: '30px' }}
            onClick={() => movePage(17)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? <span>차트</span> : <img src={Vector} alt="Profile" className="w-15 h-10" />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
