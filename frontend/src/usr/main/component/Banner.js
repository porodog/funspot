// 메인 배너
import React, { useState, useEffect } from 'react';
import Banner1 from '../imgs/Banner1.png'
import Banner2 from '../imgs/Banner2.png'
import Banner3 from '../imgs/Banner3.png'

const images = [
  Banner1,
  Banner2,
  Banner3,
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-4/5 overflow-hidden  rounded-lg ml-28">
      <div className="relative h-64 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-transparent w-1/5">
              <div className="h-full bg-custom-cyan transition-all duration-[5s] ease-linear" style={{ width: currentIndex === index ? '100%' : '0%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;