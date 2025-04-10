import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <div className="w-fit mb-10">
      <button
        onClick={() => (to ? navigate(to) : navigate(-1))}
        className="flex items-center gap-2 px-4 py-2 rounded-lg 
          bg-gradient-to-br from-white/10 to-white/5 
          text-blue-950 font-semibold text-sm shadow-md 
          backdrop-blur-sm transition-all duration-300 
          hover:from-blue-100 hover:to-blue-200 
          hover:text-blue-900 hover:shadow-lg hover:scale-105 
          focus:outline-none"
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
