import React from 'react';

interface SeatMapProps {
  rows: number;
  cols: number;
}


export const SeatMap: React.FC<SeatMapProps> = ({ rows, cols }) => {
  return (
    <div className='mt-6 bg-gray-200 p-4 rounded shadow'>
      <h2 className='text-center font-semibold mb-3'>좌석 배치도</h2>

 
      <div className='flex flex-col items-center gap-1'>
        {Array.from({ length: rows }, (_, rowIdx) => (
          <div key={rowIdx} className='flex gap-1'>
            {Array.from({ length: cols }, (_, colIdx) => (
              <div
                key={colIdx}
                className='w-6 h-6 bg-green-500 rounded-sm border border-gray-400'
              ></div>
            ))}
          </div>
        ))}
      </div>

      <p className='text-center text-sm text-gray-600 mt-3'>
        총 {rows * cols}석
      </p>
    </div>
  );
};