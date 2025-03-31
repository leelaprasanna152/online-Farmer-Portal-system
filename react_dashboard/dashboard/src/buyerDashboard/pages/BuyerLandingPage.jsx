import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import Welcome from '../components/Welcome';
import Shop from '../pages/Shop';

const BuyerDashboard = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Track current page

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);
      setShowWelcome(true);
    }
  }, []);

  const logOutHandler = () => {
    if (confirm('Are you sure to logout?')) {
      localStorage.removeItem('loginToken');
      setShowLogOut(false);
      setShowWelcome(false);
    }
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowWelcome(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowWelcome(false);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <section className='landingSection'>
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
          navigateTo={navigateTo} // Pass navigation function
        />
        <div className='collectionSection'>
          <SideBar navigateTo={navigateTo} />
          {currentPage === 'home' && <Home />}
          {currentPage === 'shop' && <Shop />}
          {showWelcome && <Welcome />}
          {showLogin && <Login showWelcomeHandler={() => navigateTo('home')} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
        </div>
      </section>
    </>
  );
};

export default BuyerDashboard;
