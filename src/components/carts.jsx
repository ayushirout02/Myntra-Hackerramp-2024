import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, buyNow } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-8 font-bold text-center text-purple-700 underline underline-offset-4 decoration-2 decoration-purple-500">
        Your Cart
      </h2>
      <div className="flex flex-wrap justify-around">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((product, index) => (
            <div key={index} className="border border-purple-700 rounded p-4 m-4 w-48 text-center bg-white">
              <img src={product.Image} alt={product["Product Name"]} className="w-full h-auto" />
              <h3 className="text-lg my-2">{product["Product Name"]}</h3>
              <p className="text-gray-500 text-sm">
                ${product.Price ? product.Price.toFixed(2) : 'N/A'}
              </p>
              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => removeFromCart(product)} 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
                <button 
                  onClick={() => buyNow(product)} 
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
