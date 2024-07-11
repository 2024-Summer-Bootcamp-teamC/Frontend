import React from 'react';
import Pin from '../assets/images/Pin.png';

interface NavBarProps {
    goPage: (pageNumber: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ goPage }) => {
    return (
        <div className="fixed left-0 right-0 w-full top-14" style={{ height: '1px' }}>
            <nav className="border-b border-black">
                <div className="container mx-auto">
                    <div className="fixed top-2 left-6 flex items-center gap-2.5 cursor-pointer hover:font-bold hover:underline" onClick={() => goPage(2)}>
                        <img src={Pin} alt="PinImage" />
                        <div style={{ fontSize: '30px' }}> 위인 모음 </div>
                    </div>
                    <div className="fixed cursor-pointer top-2 right-7 hover:font-bold hover:underline" style={{ fontSize: '30px' }} onClick={() => goPage(4)}>
                        김진용님
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
