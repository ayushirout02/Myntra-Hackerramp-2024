import React from 'react';
import { Link } from 'react-router-dom';

const QuizContainer = () => {
  return (
    <div className="container mx-auto p-4" style={{ marginBottom: 200}}>
      <p className="text-center  text-purple-900 mb-6 text-2xl">
        Unlock your unique fashion sense with our engaging pop quiz!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="quiz p-6 border rounded-lg shadow-lg text-center bg-white">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjtMe0xdkmHv21bF4__v45GIcIuBJaRFwNw&s"
            alt="Hogwarts House Quiz"
            className="quiz-image mx-auto mb-4 rounded-lg"
          />
          <h3 className="text-2xl font-semibold mb-2 text-purple-700">Which Hogwarts House Are You In?</h3>
          <p className="text-gray-600 mb-4">Find out where you belong at Hogwarts with this fun quiz.</p>
          <Link to="/hogwarts-quiz">
            <button className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
              Play Now
            </button>
          </Link>
        </div>

        <div className="quiz p-6 border rounded-lg shadow-lg text-center bg-white">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJltQ7HKhoYxPT_pSwkUrURUHPhkGMpBorZA&s" alt="GOT House Quiz"
            alt="Another Quiz"
            className="quiz-image mx-auto mb-4 rounded-lg"
          />
          <h3 className="text-2xl font-semibold mb-2 text-purple-700">Which GOT House Do You Belong To?</h3>
          <p className="text-gray-600 mb-4">Discover which Game of Thrones house you would be a part of.</p>
          <button className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
            Play Now
          </button>
        </div>

        <div className="quiz p-6 border rounded-lg shadow-lg text-center bg-white">
          <img
            src="https://quizoto.com/assets/img/quiz-images/which-bridgerton-character-are-you-feature.jpg" alt="Bridgerton Character Quiz"
            alt="Another Quiz"
            className="quiz-image mx-auto mb-4 rounded-lg"
          />
          <h3 className="text-2xl font-semibold mb-2 text-purple-700">Which Bridgerton Character Are You?</h3>
          <p className="text-gray-600 mb-4">Take this quiz to see which character from Bridgerton you are.</p>
          <button className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
