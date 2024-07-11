import React from 'react';
import CardFront from "../components/CardFront";
import CardBack from '../components/CardBack';

const GreatListPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
      <div className='flex flex-row justify-center w-full space-x-3'>
        <div className="flex-1 max-w-[237.298px] max-h-[366.962px]"><CardFront /></div>
        <div className="flex-1 max-w-[237.298px] max-h-[366.962px]"><CardFront /></div>
      </div>
      <div className='flex flex-row justify-center w-full space-x-1'>
        <div className="flex-1 max-w-[237.298px] max-h-[366.962px]"><CardFront /></div>
        <div className="flex-1 max-w-[237.298px] max-h-[366.962px]"><CardFront /></div>
      </div>
    </div>
  );
};

export default GreatListPage;
