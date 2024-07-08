import React, { ReactNode } from 'react';
import BlueTape from '../assets/images/BlueTape.png';
import ChartVideoBg from '../assets/images/ChartVideoBg.png';

type ChartVideoBackgroundProps = {
  children: ReactNode;
};

const ChartVideoBackground: React.FC<ChartVideoBackgroundProps> = ({ children }) => {
  return (
    <div
      className="w-[100%] h-[700px] bg-no-repeat bg-cover relative"
      style={{ backgroundImage: `url(${ChartVideoBg})` }}
    >
      <div
        className="w-[150px] h-[100px] bg-no-repeat bg-cover absolute -top-5 -left-10"
        style={{ backgroundImage: `url(${BlueTape})` }}
      />
      <div
        className="w-[150px] h-[100px] bg-no-repeat bg-cover absolute -bottom-5 -right-10"
        style={{ backgroundImage: `url(${BlueTape})` }}
      />
      {children}
    </div>
  );
};

export default ChartVideoBackground;
