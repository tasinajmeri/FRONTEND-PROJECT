// app/shape/page.js
"use client"

import { useState } from 'react';

const shape = () => {
  const [angle, setAngle] = useState(90);

  const handleSliderChange = (event) => {
    setAngle(event.target.value);
  };

  const rotation = angle - 90;
  const isLine = angle === 180;
  const size = isLine ? 'w-0 h-0' : 'w-52 h-52';
  const borderColor = isLine ? 'border-red-500 border-b-2 border-blue-500': 'border-transparent';

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className={`relative ${size} ${borderColor} border-solid`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation}deg)`,
        }}
      >
        
        <div
          className="absolute inset-0"
          style={{
            borderTop: isLine ? '2px solid red' : '2px solid red',
            borderBottom: isLine ? '2px solid red' : '2px solid red',
            borderLeft: isLine ? '2px solid blue' : '2px solid blue',
            borderRight: isLine ? '2px solid blue' : '2px solid blue',
            transform: isLine ? 'rotateY(0deg) translateZ(0px)' : 'rotateY(0deg) translateZ(25px)',
          }}
        ></div>
      </div>
      <input
        type="range"
        min="90"
        max="180"
        value={angle}
        onChange={handleSliderChange}
        className="w-72 mt-4"
      />
      <p className="mt-2">Angle: {angle}°</p>
    </div>
  );
};

export default shape;
