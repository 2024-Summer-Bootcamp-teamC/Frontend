import React from 'react';

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
      <div className="w-full max-w-lg p-6 bg-white rounded-md shadow-md">
        <div className="mb-4 text-xl">Explanation</div>
        <div className="mb-4">{explanation}</div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExplanationModal;
