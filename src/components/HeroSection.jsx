import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';

const HeroSection = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const banners = [
    { id: 1, imgSrc: "/Banner1.png", alt: "Banner 1" },
    { id: 2, imgSrc: "/finalquiz.png", alt: "finalquiz" },
    { id: 3, imgSrc: "/skintone.png", alt: "skintone.png" }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((currentBanner + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentBanner, banners.length]);

  useEffect(() => {
    fetch('/DressData.json')
      .then(response => response.json())
      .then(data => {
        const processedData = data.map(product => ({
          ...product,
          Price: parseFloat(product.Price),
          Sustainability_Score: parseInt(product.Sustainability_Score)
        }));
        setProducts(processedData.slice(0, 8));
      });
  }, []);

  const showDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative mb-8">
        <div className="overflow-hidden h-96 max-w-screen-lg mx-auto">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentBanner ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={banner.imgSrc}
                alt={banner.alt}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-3xl mb-7 font-bold text-center text-purple-700 underline underline-offset-4 decoration-2 decoration-purple-500 animate-fadeIn">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
        {products.map((product, index) => (
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

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct["Product Name"]}</h2>
            <div className="h-64 overflow-hidden mb-4">
              <img className="w-full h-full object-cover" src={selectedProduct.Image} alt={selectedProduct["Product Name"]} />
            </div>
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

export default HeroSection;