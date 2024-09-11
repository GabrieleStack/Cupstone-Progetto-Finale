import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './Navbar.js';

const NavbarLayout = ({ children, onSearch, cartTotal, cartItems, removeFromCart, addToCart, showSearch, isAuthenticated, setIsAuthenticated, onLogout }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      {!isAdminPage && (
        <NavBar
          onSearch={onSearch}
          showSearch={showSearch}
          cartItems={cartItems}
          cartTotal={cartTotal}
          removeFromCart={removeFromCart}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          onLogout={onLogout}
        />
      )}
      {React.cloneElement(children, { addToCart, removeFromCart })}
    </>
  );
};

export default NavbarLayout;
