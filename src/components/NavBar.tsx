import React from 'react';
import Pin from '../assets/images/Pin.png';

const NavBar: React.FC = () => {
    const handleClick = () => {
        alert("위인 모음집 모달창이 뜨도록 수정해yo!")
    }

    return (
        <div className="fixed left-0 right-0 top-20 " style={{ width: 'full', height: '1px' }}> {/* 헤더 프레임 설정 */}
            <nav className="border-b border-black"> {/* 네비게이션 바 하단에 선추가*/}
                <div className ="container mx-auto">
                        <div className="fixed top-4 left-10 flex items-center gap-2.5" onClick={handleClick}>
                            <img src={Pin} alt="PinImage" />
                            <div style={{fontSize: '30px'}}> 위인 모음 </div>
                        </div>
                        <div className="fixed top-4 right-14" style={{fontSize: '30px'}}> 김진용님 </div>
                    </div>
            </nav>
        </div>
    );
};

export default NavBar;
