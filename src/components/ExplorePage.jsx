import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from './ProductList'; // Adjust path if necessary

const ExplorePage = () => {
  const { result } = useParams();

  return <ProductList quizResult={result} />; // Pass result to ProductList
};

export default ExplorePage;
    