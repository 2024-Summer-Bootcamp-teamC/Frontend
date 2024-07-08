import React from 'react';
import CardFront from "../components/CardFront";
import CardBack from '../components/CardBack';

const GreatPage: React.FC = () => {
    return (
        <CardBack />
    );
};

export default GreatPage;


// GreatPage를 적용한 App.tsx

// import React from 'react';
// import './index.css';
// import NavBar from './components/NavBar';
// import GreatPage from './pages/GreatPage';

// const App: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen font-songmyung">
//       <NavBar />
//       <div className="mt-20 space-y-8">  {/* space-y, -x로 두행 사이의 간격을 조정 */}
//         <div className="flex space-x-4"> 
//           <GreatPage />
//           <GreatPage />
//           <GreatPage />
//           <GreatPage />
//           <GreatPage />
//         </div>
//         <div className="flex space-x-4"> 
//           <GreatPage />
//           <GreatPage />
//           <GreatPage />
//           <GreatPage />
//           <GreatPage />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
