import React from 'react';
import CardFront from "../components/CardFront";
import CardBack from '../components/CardBack';

const GreatListPage: React.FC = () => {
    return (
        <div>
            <div className='flex flex-row justify-center space-x-3'>
                <span><CardFront /> </span>
                <span><CardFront /> </span>
            </div>
            <div className='flex flex-row justify-center space-x-1'>
                <span><CardFront /> </span>
                <span><CardFront /> </span>
            </div>
        </div>
    );
};

export default GreatListPage;