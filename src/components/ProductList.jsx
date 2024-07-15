import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';

const houseTags = {
  Gryffindor: ["Maroon", "Warm", "Bold", "Red", "Gold", "Denim", "Leather", "Ruby"],
  Slytherin: ["Silky", "Glossy", "Green", "Silver", "Classy", "Flowy", "Sequin", "Blazer", "Leather", "Emerald"],
  Ravenclaw: ["Coat", "Linen", "Crisp", "Blue", "Bronze", "Sequin", "Blazer", "Grey", "Teal", "Sapphire"],
  Hufflepuff: ["Sundress", "Jumpers", "Cotton", "Yellow", "Black", "Floral", "Cardigan", "Pink", "Orange"]
};

const categorizeProduct = (product) => {
  for (let house in houseTags) {
    for (let tag of houseTags[house]) {
      if (product.Color.toLowerCase().includes(tag.toLowerCase()) || product.Subcategory.toLowerCase().includes(tag.toLowerCase())) {
        return house;
      }
    }
  }
  return "Uncategorized";
};

const ProductList = ({ quizResult }) => {
  const [products, setProducts] = useState([]);
  const [bestOutfit, setBestOutfit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const productsPerPage = 8;
  const maxPages = 7;

  const generatePopulation = (products, populationSize) => {
    const population = [];
    for (let i = 0; i < populationSize; i++) {
      const individual = {
        top: null,
        bottom: null,
        dress: null,
        coord_set: null,
        outerwear: null,
        accessory: null
      };

      if (Math.random() > 0.7) {
        individual.top = products.find(p => p.Category === 'Top')?.["Product Name"] || null;
        individual.bottom = products.find(p => p.Category === 'Bottom')?.["Product Name"] || null;
      } else {
        if (Math.random() > 0.4) {
          individual.dress = products.find(p => p.Category === 'Dress')?.["Product Name"] || null;
        } else {
          individual.coord_set = products.find(p => p.Category === 'Set')?.["Product Name"] || null;
        }
      }

      if (Math.random() > 0.5) {
        individual.outerwear = products.find(p => p.Category === 'Outerwear')?.["Product Name"] || null;
      }
      if (Math.random() > 0.5) {
        individual.accessory = products.find(p => p.Category === 'Accessory')?.["Product Name"] || null;
      }

      population.push(individual);
    }
    return population;
  };

  const colorMatch = (color, colorPreferences) => {
    color = color.toLowerCase();
    return colorPreferences.some(pref => color.includes(pref.toLowerCase()));
  };

  const fitness = (individual, products, quizResults) => {
    let score = 0;
    let totalSustainabilityScore = 0;
    let componentCount = 0;

    Object.values(individual).forEach(componentName => {
      if (componentName) {
        const product = products.find(p => p["Product Name"] === componentName);
        if (product) {
          totalSustainabilityScore += product.Sustainability_Score;

          if (colorMatch(product.Color, quizResults.colorPreferences)) {
            score += 1.0;
          } else {
            score -= 0.2;
          }

          componentCount++;
        }
      }
    });

    if (componentCount > 0) {
      const averageSustainabilityScore = totalSustainabilityScore / componentCount;
      score += averageSustainabilityScore;
    }

    return score;
  };

  const selection = (population, products, quizResults) => {
    const sortedPopulation = population.sort((a, b) => 
      fitness(b, products, quizResults) - fitness(a, products, quizResults)
    );
    return sortedPopulation.slice(0, Math.floor(population.length / 2));
  };

  const crossover = (parent1, parent2) => {
    const child = {};
    Object.keys(parent1).forEach(key => {
      child[key] = Math.random() > 0.5 ? parent1[key] : parent2[key];
    });
    return validateIndividual(child);
  };

  const mutate = (individual, products, mutationRate) => {
    if (Math.random() < mutationRate) {
      const key = Object.keys(individual)[Math.floor(Math.random() * Object.keys(individual).length)];
      const category = key === 'coord_set' ? 'Set' : key.charAt(0).toUpperCase() + key.slice(1);
      individual[key] = products.find(p => p.Category === category)?.["Product Name"] || null;
    }
    return validateIndividual(individual);
  };

  const validateIndividual = (individual) => {
    if (individual.top) {
      if (!individual.bottom) {
        individual.bottom = products.find(p => p.Category === 'Bottom')?.["Product Name"] || null;
      }
      individual.dress = null;
      individual.coord_set = null;
    } else {
      if (!individual.dress && !individual.coord_set) {
        if (Math.random() > 0.5) {
          individual.dress = products.find(p => p.Category === 'Dress')?.["Product Name"] || null;
          individual.coord_set = null;
        } else {
          individual.dress = null;
          individual.coord_set = products.find(p => p.Category === 'Set')?.["Product Name"] || null;
        }
      } else if (individual.dress) {
        individual.coord_set = null;
      } else if (individual.coord_set) {
        individual.dress = null;
      }
      individual.top = null;
      individual.bottom = null;
    }
    return individual;
  };

  const geneticAlgorithm = (products, quizResults) => {
    const populationSize = 50;
    const generations = 50;
    const mutationRate = 0.1;

    let population = generatePopulation(products, populationSize);

    for (let i = 0; i < generations; i++) {
      population = selection(population, products, quizResults);
      const newPopulation = [];
      for (let j = 0; j < populationSize; j++) {
        const parent1 = population[Math.floor(Math.random() * population.length)];
        const parent2 = population[Math.floor(Math.random() * population.length)];
        let child = crossover(parent1, parent2);
        child = mutate(child, products, mutationRate);
        newPopulation.push(child);
      }
      population = newPopulation;
    }

    return selection(population, products, quizResults)[0];
  };

  useEffect(() => {
    fetch('/DressData.json')
      .then(response => response.json())
      .then(data => {
        const categorizedData = data.map(product => ({
          ...product,
          house: categorizeProduct(product),
          Price: parseFloat(product.Price),
          Sustainability_Score: parseInt(product.Sustainability_Score)
        }));

        const filteredProducts = categorizedData.filter(product => product.house === quizResult);
        setProducts(filteredProducts);

        // Run genetic algorithm
        const quizResults = {
          colorPreferences: houseTags[quizResult]
        };
        const bestOutfit = geneticAlgorithm(filteredProducts, quizResults);
        console.log('Best Outfit:', bestOutfit);
        setBestOutfit(bestOutfit);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
      {bestOutfit && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Best Outfit Combination</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(bestOutfit).map(([key, productName]) => (
              productName && (
                <div key={key} className="card border p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                  <p>{productName}</p>
                  <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover mt-2" src={products.find(p => p["Product Name"] === productName)?.Image} alt={productName} />
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
      <div>
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
                <div className="flex justify-between ">
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
                style={{ padding: '8px 6px', fontSize: '14px' }}
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

export default ProductList;