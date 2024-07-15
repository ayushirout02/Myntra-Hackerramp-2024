import React from 'react';

const Product = ({ id, imgSrc, name, price, addToCart }) => {
  return (
    <div className="card border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
      <div className="h-64 overflow-hidden">
        <img className="w-full h-full object-cover" src={imgSrc} alt={name} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="mb-2">Price: {price}</p>
        <div className="flex justify-center">
          <button
            onClick={() => addToCart({ id, imgSrc, name, price })}
            style={{ padding: '8px 16px', fontSize: '14px' }}
            className="bg-green-500 text-white rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
