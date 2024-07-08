import React from 'react';
import './index.css';
import NavBar from './components/NavBar';

const App: React.FC = () => {
    return (
      <div className="flex items-center justify-center min-h-screen font-songmyung">
        <div className="App">
            <NavBar />
            <div className="content">
                <h1 className="mt-40 text-center">Welcome to My Website</h1>
            </div>
        </div>
      </div>
    );
};

export default App;