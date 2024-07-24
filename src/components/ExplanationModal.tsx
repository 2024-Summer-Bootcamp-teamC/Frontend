import React from 'react';
import explainImge from '../assets/images/ExplainImage.png';
import RedBtn from '../assets/images/GreatPageRedBtn.png';

interface ExplanationModalProps {
  isOpen: boolean;
  explanation: string;
  onClose: () => void;
  onNextQuiz: () => void; // Add this prop
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, explanation, onClose, onNextQuiz }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    onNextQuiz(); // Move to the next quiz when the modal closes
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative">
        <img src={explainImge} alt="모달두루마리" className={`shadow-lg transition-opacity duration-500`}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">        
          <div className="mb-4 text-xl">[ 해설 ]</div>
            <div className="mb-4">{explanation}</div>
            <button
              style={{ backgroundImage: `url(${RedBtn})` }}
              className="px-6 py-2 mt-3 text-xs text-white"
              onClick={handleClose}
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;

