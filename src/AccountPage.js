// AccountPage.js
import React from 'react';

const AccountPage = ({ userData, cart }) => {
  return (
    <div className="account-page">
      <h1>Il tuo Account</h1>
      <div className="account-info">
        <h2>Informazioni Personali</h2>
        <p><strong>Nome:</strong> {userData?.firstName}</p>
        <p><strong>Cognome:</strong> {userData?.lastName}</p>
        <p><strong>Email:</strong> {userData?.email}</p>
      </div>
      <div className="account-cart">
        <h2>Il tuo Carrello</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                {item.name} - €{item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Il carrello è vuoto</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
