import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarLayout from './Layoutfornavbar.js';
import MainSection from './Mainsection.js';
import Info from './Info.js';
import HandleBackend from './HandleBackend.js';
import CartPage from './CartPage.js';
import AccountPage from './AccountPage.js';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [wines, setWines] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    if (authStatus) {
      const userId = JSON.parse(localStorage.getItem('registrationData'))._id;
      const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/wine');
        const data = await response.json();
        setWines(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Errore nel recupero dei dati dei vini:', error);
      }
    };

    fetchWines();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const userId = JSON.parse(localStorage.getItem('registrationData'))._id;
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const handleSearch = (query) => {
    if (query) {
      const results = wines.filter(wine =>
        wine.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(wines);
    }
  };

  const addToCart = (wine) => {
    setCart(prevCart => [...prevCart, wine]);
  };

  const removeFromCart = (wineId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== wineId));
  };

  const totalCartPrice = cart.reduce((total, wine) => total + wine.price, 0);

  const handleLogout = () => {
    const userId = JSON.parse(localStorage.getItem('registrationData'))?._id;

    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }

    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('registrationData');
    setCart([]); // Pulisce il carrello
    window.location.reload(); // Ricarica la pagina per riflettere i cambiamenti
  };

  return (
    <Router>
      <NavbarLayout
        onSearch={handleSearch}
        cartTotal={totalCartPrice}
        cartItems={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        showSearch={true}
        cart={cart}
        setCart={setCart}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<MainSection searchResults={searchResults} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/info" element={<Info />} />
          <Route path="/admin" element={<HandleBackend />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} totalCartPrice={totalCartPrice} />} />
          <Route path="/account" element={<AccountPage userData={JSON.parse(localStorage.getItem('registrationData'))} cart={cart} />} />
        </Routes>
      </NavbarLayout>
    </Router>
  );
}

export default App;
