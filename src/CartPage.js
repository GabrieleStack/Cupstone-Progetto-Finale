import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function CartPage({ cart, removeFromCart, totalCartPrice }) {
  return (
    <div className="cart-page">
      <h1>Il Tuo Carrello</h1>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <ListGroup>
          {cart.map(item => (
            <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center">
              <span>{item.name} - €{item.price.toFixed(2)}</span>
              <Button
                variant="link"
                className="text-danger"
                onClick={() => removeFromCart(item._id)}
              >
                Rimuovi
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <h2 className="mt-3">Totale: €{totalCartPrice.toFixed(2)}</h2>
      <Button variant="primary" className="mt-3">Procedi con l'ordine</Button>
      <br />
      <Link to="/" className="mt-3 d-inline-block">Torna alla Home</Link>
    </div>
  );
}

export default CartPage;
