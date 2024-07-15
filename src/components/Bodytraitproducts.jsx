import React, { useState, useEffect } from 'react';

const skintoneTags = {
  Warm: ["Maroon", "Orange", "Red", "Gold", "Yellow", "Ruby"],
  Neutral: ["Grey", "Navy", "Green", "Brown", "Emerald"],
  Cool: ["Blue", "Purple", "Peach", "Pink", "Navy"],
};

const categorizeProduct = (product) => {
  for (let skinTone in skintoneTags) {
    for (let tag of skintoneTags[skinTone]) {
      if (product.Color.toLowerCase().includes(tag.toLowerCase()) || product.Subcategory.toLowerCase().includes(tag.toLowerCase())) {
        return skinTone;
      }
    }
  }
  return "Uncategorized";
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [bestOutfit, setBestOutfit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
          skinTone: categorizeProduct(product),
          Price: parseFloat(product.Price),
          Sustainability_Score: parseInt(product.Sustainability_Score)
        }));

        const filteredProducts = categorizedData.filter(product => product.skinTone === quizResult);
        setProducts(filteredProducts);

        // Run genetic algorithm
        const quizResults = {
          colorPreferences: skintoneTags[quizResult]
        };
        const bestOutfit = geneticAlgorithm(filteredProducts, quizResults);
        console.log('Best Outfit:', bestOutfit);
        setBestOutfit(bestOutfit);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
          <h2 className="text-2xl font-bold mb-4">Best Outfit:</h2>
          <div className="flex flex-wrap">
            {Object.values(bestOutfit).map((componentName, index) => (
              componentName && (
                <div key={index} className="m-2">
                  <div>{componentName}</div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={product.Image} alt={product.Name} className="w-full h-64 object-cover object-center" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{product.Name}</h2>
              <p className="text-gray-700 mb-2">{product.Description}</p>
              <p className="text-gray-700">Price: ${product.Price.toFixed(2)}</p>
              <button
                onClick={() => showDetails(product)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 inline-block"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-2 py-2 px-4 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Product details modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <button onClick={closeDetails} className="absolute top-0 right-0 p-4">
              <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedProduct.Name}</h2>
            <img src={selectedProduct.Image} alt={selectedProduct.Name} className="w-full h-64 object-cover object-center mb-4" />
            <p className="text-gray-700 mb-2">{selectedProduct.Description}</p>
            <p className="text-gray-700">Price: ${selectedProduct.Price.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
