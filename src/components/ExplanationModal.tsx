import React from 'react';

interface ExplanationModalProps {
  isOpen: boolean;
  explanation: string;
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, explanation, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-md shadow-md">
        <div className="mb-4 text-xl">Explanation</div>
        <div className="mb-4">{explanation}</div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExplanationModal;
