import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';

const AllProducts = ({ quizResult }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const productsPerPage = 8;
  const maxPages = 7;

  useEffect(() => {
    fetch('/DressData.json')
      .then(response => response.json())
      .then(data => {
        const categorizedData = data.map(product => ({
          ...product,
          Price: parseFloat(product.Price),
          Sustainability_Score: parseInt(product.Sustainability_Score)
        }));

        const filteredProducts = categorizedData.filter(product => product.house === quizResult);
        setProducts(filteredProducts);
      });
  }, [quizResult]);

  const showDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.min(Math.ceil(products.length / productsPerPage), maxPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All {quizResult} Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product, index) => (
          <div key={index} className="card border rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img className="w-full h-full object-cover" src={product.Image} alt={product["Product Name"]} />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{product["Product Name"]}</h2>
              <p className="mb-2">Price: ${product.Price.toFixed(2)}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => showDetails(product)}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                  className="bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Show Details
                </button>
                <button
                  onClick={() => addToCart(product)}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                  className="bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-2 py-2 px-4 rounded-xl ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct["Product Name"]}</h2>
            <div className="h-64 overflow-hidden mb-4">
              <img className="w-full h-full object-cover" src={selectedProduct.Image} alt={selectedProduct["Product Name"]} />
            </div>
            <p className="mb-2">House: {selectedProduct.house}</p>
            <p className="mb-2">Color: {selectedProduct.Color}</p>
            <p className="mb-2">Category: {selectedProduct.Category}</p>
            <p className="mb-2">Subcategory: {selectedProduct.Subcategory}</p>
            <p className="mb-2">Price: ${selectedProduct.Price.toFixed(2)}</p>
            <p className="mb-2">Fabrics: {selectedProduct.Fabrics}</p>
            <p className="mb-2">Sustainability Score: {selectedProduct.Sustainability_Score}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => { addToCart(selectedProduct); closeDetails(); }}
                style={{ padding: '8px 16px', fontSize: '14px' }}
                className="bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
              <button
                onClick={closeDetails}
                style={{ padding: '8px 16px', fontSize: '14px' }}
                className="bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
