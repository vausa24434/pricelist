
import React, { useState } from 'react';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://utvuupcdlkwseiplgfff.supabase.co/storage/v1/object/sign/banner/banner%20game.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXIvYmFubmVyIGdhbWUud2VicCIsImlhdCI6MTcyMzczNjYwMiwiZXhwIjo0ODc3MzM2NjAyfQ.JtJTJR7EfPLBRzQ1yZKVjBzga96smswPFFqNhsXEVw4&t=2024-08-15T15%3A43%3A23.211Z",
    "https://utvuupcdlkwseiplgfff.supabase.co/storage/v1/object/sign/banner/header%20twitter.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXIvaGVhZGVyIHR3aXR0ZXIud2VicCIsImlhdCI6MTcyMzczNjY2MCwiZXhwIjo0ODc3MzM2NjYwfQ.J82ZSdC5t1mg72dQA0Hsap65zuhVW6fySpd1D6WqJa4&t=2024-08-15T15%3A44%3A21.160Z",
    "https://utvuupcdlkwseiplgfff.supabase.co/storage/v1/object/sign/banner/banner%20game.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXIvYmFubmVyIGdhbWUud2VicCIsImlhdCI6MTcyMzczNjYwMiwiZXhwIjo0ODc3MzM2NjAyfQ.JtJTJR7EfPLBRzQ1yZKVjBzga96smswPFFqNhsXEVw4&t=2024-08-15T15%3A43%3A23.211Z",
    "https://utvuupcdlkwseiplgfff.supabase.co/storage/v1/object/sign/banner/header%20twitter.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXIvaGVhZGVyIHR3aXR0ZXIud2VicCIsImlhdCI6MTcyMzczNjY2MCwiZXhwIjo0ODc3MzM2NjYwfQ.J82ZSdC5t1mg72dQA0Hsap65zuhVW6fySpd1D6WqJa4&t=2024-08-15T15%3A44%3A21.160Z",
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full flex-shrink-0"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="block w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-5 h-5 md:w-10 md:h-10 rounded-full bg-black ring-2 md:ring-4 ring-gray-200 group-hover:bg-gray-500">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-5 h-5 md:w-10 md:h-10 rounded-full bg-black ring-2 md:ring-4 ring-gray-200 group-hover:bg-gray-500">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
