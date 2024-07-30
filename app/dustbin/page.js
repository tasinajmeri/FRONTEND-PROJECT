// app/dustbin/page.js

// here I have used react-dnd-html5-backend library to implement the drag and drop functionalities
"use client"
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  DISC: 'disc',
};

function Disc({ color }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DISC,
    item: { color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    
    <div
      ref={drag}
      className={`mt-1 w-full h-10 rounded-md border-2 border-white ${
        color === 'blue' ? 'bg-blue-500' : 'bg-red-500'
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    ></div>
  );
}

function BinComponent() {
  const [blueDiscs, setBlueDiscs] = useState(5);
  const [redDiscs, setRedDiscs] = useState(5);

  const [{ isOverBlue }, dropBlue] = useDrop({
    accept: ItemTypes.DISC,
    drop: (item) => {
      if (item.color === 'red') {
        setRedDiscs((prev) => prev - 1);
        setBlueDiscs((prev) => prev + 1);
      }
    },
    collect: (monitor) => ({
      isOverBlue: !!monitor.isOver(),
    }),
  });

  const [{ isOverRed }, dropRed] = useDrop({
    accept: ItemTypes.DISC,
    drop: (item) => {
      if (item.color === 'blue') {
        setBlueDiscs((prev) => prev - 1);
        setRedDiscs((prev) => prev + 1);
      }
    },
    collect: (monitor) => ({
      isOverRed: !!monitor.isOver(),
    }),
  });

  return (
    <section className="flex items-center justify-center space-x-16 mx-auto w-3/5">
        
      <div
        ref={dropBlue}
        className={`bin1 flex flex-col items-center justify-center rounded-md border-2 border-blue-500 w-1/3 h-68 mt-12 ${
          isOverBlue ? 'bg-blue-100' : ''
        }`}
      >
        {Array.from({ length: blueDiscs }).map((_, index) => (
          <Disc key={index} color="blue" />
        ))}
        <button
          onClick={() => setBlueDiscs((prev) => prev + 1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          +
        </button>
      </div>
      <div
        ref={dropRed}
        className={`bin1 flex flex-col items-center justify-center rounded-md border-2 border-red-500 w-1/3 h-68 mt-12 ${
          isOverRed ? 'bg-red-100' : ''
        }`}
      >
        {Array.from({ length: redDiscs }).map((_, index) => (
          <Disc key={index} color="red" />
        ))}
        <button
          onClick={() => setRedDiscs((prev) => (prev > 0 ? prev - 1 : 0))}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          -
        </button>
      </div>
      
   </section>
  );
}

export default function Bin() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BinComponent />
    </DndProvider>
  );
}
