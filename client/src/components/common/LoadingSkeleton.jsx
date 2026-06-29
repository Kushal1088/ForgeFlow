import React from 'react';

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx} 
          className={`bg-[#1e1f26] border border-[#464554]/30 rounded-2xl p-6 ${
            type === 'table' ? 'h-12' : 'h-32'
          }`}
        >
          <div className="h-4 bg-[#282a31] rounded w-1/3 mb-3"></div>
          <div className="h-3 bg-[#282a31] rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
};
