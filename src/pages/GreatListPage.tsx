import React, { useState } from 'react';
import CardFront from "../components/CardFront";
import CardBack from '../components/CardBack';
import ReactCardFlip from 'react-card-flip';

interface CardProps {
    movePage: (pageNumber: number) => void;
}

const GreatListPage: React.FC<CardProps> = ({ movePage }) => {
    const [isFlipped1, setIsFlipped1] = useState(false);
    const [isFlipped2, setIsFlipped2] = useState(false);
    const [isFlipped3, setIsFlipped3] = useState(false);
    const [isFlipped4, setIsFlipped4] = useState(false);


    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 scale-90">
            <div className='flex flex-row justify-center w-full space-x-3'>
                <div 
                    className="flex-1 max-w-[237.298px] max-h-[366.962px]"
                    onMouseEnter={() => setIsFlipped1(true)}
                    onMouseLeave={() => setIsFlipped1(false)}
                    onClick={() => movePage(7)}
                >
                    <ReactCardFlip isFlipped={isFlipped1} flipDirection="horizontal" >
                        <CardFront key="front1" />
                        <CardBack key="back1" />
                    </ReactCardFlip>
                </div>
                <div 
                    className="flex-1 max-w-[237.298px] max-h-[366.962px]"
                    onMouseEnter={() => setIsFlipped2(true)}
                    onMouseLeave={() => setIsFlipped2(false)}
                    onClick={() => movePage(7)}
                >
                    <ReactCardFlip isFlipped={isFlipped2} flipDirection="horizontal">
                        <CardFront key="front2" />
                        <CardBack key="back2" />
                    </ReactCardFlip>
                </div>
            </div>
            <div className='flex flex-row justify-center w-full space-x-1'>
                <div 
                    className="flex-1 max-w-[237.298px] max-h-[366.962px]"
                    onMouseEnter={() => setIsFlipped3(true)}
                    onMouseLeave={() => setIsFlipped3(false)}
                    onClick={() => movePage(7)}
                >
                    <ReactCardFlip isFlipped={isFlipped3} flipDirection="horizontal">
                        <CardFront key="front3" />
                        <CardBack key="back3" />
                    </ReactCardFlip>
                </div>
                <div 
                    className="flex-1 max-w-[237.298px] max-h-[366.962px]"
                    onMouseEnter={() => setIsFlipped4(true)}
                    onMouseLeave={() => setIsFlipped4(false)}
                    onClick={() => movePage(7)}
                >
                    <ReactCardFlip isFlipped={isFlipped4} flipDirection="horizontal">
                        <CardFront key="front4" />
                        <CardBack key="back4" />
                    </ReactCardFlip>
                </div>
            </div>
        </div>
    );
};

export default GreatListPage;
