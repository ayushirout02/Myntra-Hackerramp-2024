import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext'; // Adjust path if necessary

const Nav = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="flex justify-between bg-purple-600 py-2 px-4">
      <Link href=""><div className="text-white text-xl mx-3 px-2  rounded">Style Evolution</div></Link>
      <div className="flex">
        <Link to="/" className="text-white mx-3 px-2 hover:bg-purple-400 rounded">Home</Link>
        <Link to="/products" className="text-white mx-3 px-2 hover:bg-purple-400 rounded">Products</Link>
        <Link to="/quizzes" className="text-white mx-3 px-2 hover:bg-purple-400 rounded">Quiz corner</Link>
        <Link to="/contact" className="text-white mx-3 px-2 hover:bg-purple-400 rounded">Contact</Link>
        <Link to="/about" className="text-white mx-3 px-2 hover:bg-purple-400 rounded">About</Link>
        <Link to="/profile" className="text-white mx-3 px-2 hover:bg-purple-400 rounded">Profile</Link>
      </div>
      <div className="relative">
        <Link to="/cart" className="text-white mx-3 px-2 rounded">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">{cart.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
