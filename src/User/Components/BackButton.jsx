import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to })=> {
  const navigate = useNavigate();

  return (
    <div className={`w-fit mb-10 `}>
      <button
       onClick={() => (to ? navigate(to) : navigate(-1))}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-white/10 text-blue-950 font-bold text-sm shadow-md hover:bg-white/20 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
    </div>
  );
};

export default BackButton;
