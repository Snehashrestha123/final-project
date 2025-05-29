import { Storecontext } from './context/Storecontext';
import React, { useState, useContext, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/footer/Footer';
import LoginPopup from './components/loginPopup/LoginPopup';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Placeorder from './pages/placeorder/Placeorder';
import Order from './pages/order/Order';
import Review from './pages/review/Review';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token, cartItems, setCartItems } = useContext(Storecontext);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      setShowLogin(true);
      return <Navigate to="/" />;
    }
    return children;
  };

  useEffect(() => {
    if (token) {
      setShowLogin(false);
    }
  }, [token]);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/orders' element={<Order />} /> {/* Use /orders for order history */}
          <Route path='/review' element={<Review />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;




