import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const DescriptionSection = ({ description }) => {
  // Split the description into points (assuming each line or sentence is a new point)
  const points = description?.split('\n').filter(point => point.trim() !== '');

  return (
    <div className="w-11/12 sm:w-10/12 mx-auto mt-2 space-y-2">
      {points?.map((point, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2 text-xs sm:text-sm text-gray-800"
        >
          <FaCheckCircle className="text-green-600 mt-1.5 shrink-0" />
          <p className="leading-snug">{point.trim()}</p>
        </div>
      ))}
    </div>
  );
};

export default DescriptionSection;
