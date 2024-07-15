import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "What trait do you value the most?",
    options: {
      a: "Courage",
      b: "Ambition",
      c: "Intelligence",
      d: "Loyalty"
    },
    scores: {
      a: "Gryffindor",
      b: "Slytherin",
      c: "Ravenclaw",
      d: "Hufflepuff"
    }
  },
  {
    question: "Which of these would you most hate people to call you?",
    options: {
      a: "Cowardly",
      b: "Ordinary",
      c: "Ignorant",
      d: "Selfish"
    },
    scores: {
      a: "Gryffindor",
      b: "Hufflepuff",
      c: "Ravenclaw",
      d: "Slytherin"
    }
  },
  {
    question: "What is your favorite class at Hogwarts?",
    options: {
      a: "Defense Against the Dark Arts",
      b: "Potions",
      c: "Charms",
      d: "Herbology"
    },
    scores: {
      a: "Gryffindor",
      b: "Slytherin",
      c: "Ravenclaw",
      d: "Hufflepuff"
    }
  },
  {
    question: "Which magical creature do you find most fascinating?",
    options: {
      a: "Phoenix",
      b: "Basilisk",
      c: "Hippogriff",
      d: "House-elf"
    },
    scores: {
      a: "Gryffindor",
      b: "Slytherin",
      c: "Ravenclaw",
      d: "Hufflepuff"
    }
  }
];

const HogwartsHouseQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleOptionChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    });
  };

  const submitQuiz = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }

    const houseCounts = Object.values(answers).reduce((acc, house) => {
      acc[house] = (acc[house] || 0) + 1;
      return acc;
    }, {});

    const sortedHouses = Object.keys(houseCounts).sort((a, b) => houseCounts[b] - houseCounts[a]);
    const resultHouse = sortedHouses[0];

    setResult(resultHouse);
  };

  const getResultImageSrc = (house) => {
    switch (house) {
      case "Gryffindor":
        return "https://c4.wallpaperflare.com/wallpaper/672/923/822/harry-potter-gryffindor-wallpaper-preview.jpg";
      case "Slytherin":
        return "https://w0.peakpx.com/wallpaper/675/385/HD-wallpaper-slytherin-logo-in-forest-green-background-slytherin.jpg";
      case "Ravenclaw":
        return "https://i.pinimg.com/564x/00/4a/1c/004a1c19a8cf6fb41bb3bddd6caef647.jpg";
      case "Hufflepuff":
        return "https://m.media-amazon.com/images/I/71yfiyuhurL._AC_UF894,1000_QL80_.jpg";
      default:
        return "https://via.placeholder.com/150";
    }
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div
      className="quiz-container mx-auto my-12 p-8 max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-lg text-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1561469375-93564af0fdd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="text-4xl font-bold text-purple-700 mb-6 animate-fadeIn">Hogwarts House Quiz</h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQI8iQu0XS4Fk2sTH8qLAOvd2XzFd-BomWKg&s"
        alt="Hogwarts Houses"
        className="quiz-image my-4 mx-auto w-1/2 rounded-lg shadow-md animate-fadeIn"
      />
      {!result ? (
        <>
          <div className="progress-bar bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-purple-700 h-2 rounded-full" style={{ width: `${(answeredCount / questions.length) * 100}%` }}></div>
          </div>
          {questions.map((q, index) => (
            <div key={index} className="my-4 p-4 bg-white bg-opacity-75 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">{q.question}</h3>
              <div className="options flex flex-col items-start">
                {Object.keys(q.options).map((key) => (
                  <label key={key} className="my-1 flex items-center">
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={q.scores[key]}
                      onChange={() => handleOptionChange(index, q.scores[key])}
                      className="mr-2"
                    />
                    {q.options[key]}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={submitQuiz}
            className="bg-purple-700 text-white py-2 px-6 rounded-full mt-4 transition duration-300 hover:bg-purple-900 hover:shadow-lg animate-bounce"
          >
            Submit
          </button>
        </>
      ) : (
        <div id="quiz-result" className="animate-fadeIn">
          <img
            src={getResultImageSrc(result)}
            alt="Result House"
            className="result-image my-4 mx-auto w-1/2 rounded-lg shadow-md"
          />
          <div className="result-message text-2xl font-semibold">
            Congratulations! You belong to <span className="result-house font-bold text-purple-700">{result}</span> house.
          </div>
          <button
            onClick={() => navigate(`/explore/${result}`)}
            className="bg-blue-700 text-white py-2 px-6 rounded-full mt-4 transition duration-300 hover:bg-blue-900 hover:shadow-lg animate-bounce"
          >
            Explore Styles
          </button>
        </div>
      )}
    </div>
  );
};

export default HogwartsHouseQuiz;
  