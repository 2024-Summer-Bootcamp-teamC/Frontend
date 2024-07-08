import React from 'react';

const NavBar: React.FC = () => {
    return (
        <div className="fixed w-full top-20" style={{ width: '1512px', height: '1px' }}>
            <nav className="p-4 bg-gray-800">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="font-bold text-white">My Website</div>
                        <div>
                            <a href="#" className="px-3 text-white">Home</a>
                            <a href="#" className="px-3 text-white">About</a>
                            <a href="#" className="px-3 text-white">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
