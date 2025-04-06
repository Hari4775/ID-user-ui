import React from 'react';
import { FaHotel, FaUtensils, FaRunning, FaCheckCircle } from 'react-icons/fa';

const CommonHeadingSection = ({ planItem }) => {
  return (
    <div className="rounded-xl shadow-md bg-gradient-to-r from-blue-900 to-blue-700 text-white px-3 py-2 my-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        {/* Day Badge and Title */}
        <div className="flex items-center gap-2">
          <div className="bg-white text-blue-900 text-xs sm:text-sm font-bold rounded-full px-3 py-1 shadow">
            Day {planItem?.day}
          </div>
          <h2 className="text-sm sm:text-base font-semibold">{planItem?.day_Heading}</h2>
        </div>

        {/* Included Items */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
          <span className="flex items-center gap-1 text-green-300">
            <FaCheckCircle />
            Included:
          </span>

          {planItem?.accommodations?.length > 0 && (
            <span className="flex items-center gap-1">
              <FaHotel /> {planItem.accommodations.length} Hotel
            </span>
          )}

          {planItem?.activities?.length > 0 && (
            <span className="flex items-center gap-1">
              <FaRunning /> {planItem.activities.length} Activities
            </span>
          )}

          {planItem?.foods?.length > 0 && (
            <span className="flex items-center gap-1">
              <FaUtensils /> {planItem.foods.length} Food
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonHeadingSection;
