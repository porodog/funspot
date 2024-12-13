import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <button
      onClick={handleGoBack}
      className="px-4 py-2 bg-custom-cyan text-white rounded-md hover:bg-emerald-500"
    >
      ←
    </button>
  );
};

export default GoBackButton;
