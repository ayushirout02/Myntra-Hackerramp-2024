import React from 'react';

const Quiz = ({ imgSrc, title, description, onClick }) => {
  return (
    <div className="border border-purple-400 rounded p-4 m-4 w-80 bg-white text-center">
      <img src={imgSrc} alt={title} className="w-full h-auto" />
      <h3 className="text-lg my-2">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
      <button onClick={onClick} className="bg-purple-200 text-white py-2 px-4 mt-2 rounded hover:bg-purple-400">Play Now</button>
    </div>
  );
};

export default Quiz;
