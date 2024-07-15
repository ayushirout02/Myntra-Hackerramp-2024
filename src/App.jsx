// App.jsx or wherever your routing is defined
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import QuizContainer from './components/QuizContainer';
import HogwartsHouseQuiz from './components/HogwartsHouseQuiz';
import Cart from './components/carts'; // Adjust path if necessary
import { CartProvider } from './components/CartContext'; // Adjust path if necessary
import ExplorePage from './components/ExplorePage'; // Import ExplorePage component
import HeroSection from './components/HeroSection';
import AllProducts from './components/AllProducts';
import ContactUsPage from './components/Contact';
import About from './components/About'
import Footer from './components/Footer'
import Profile from './components/Profile';
import ProfileAlgo from './components/ProfileAlgo';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="bg-pink-100 min-h-screen">
          <Nav />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/quizzes" element={<QuizContainer />} />
            <Route path="/hogwarts-quiz" element={<HogwartsHouseQuiz />} />
            <Route path="/explore/:result" element={<ExplorePage />} /> {/* Route with parameter */}
            <Route path="/cart" element={<Cart />} />
            <Route path='/products' element={<AllProducts/>}/>
            <Route path='/contact' element={<ContactUsPage/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/profile-algo/:result?" element={<ProfileAlgo />} />
          </Routes>
          <Footer/>
      
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;