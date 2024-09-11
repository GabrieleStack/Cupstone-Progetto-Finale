import React, { useState, useRef } from 'react';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

export default function SecondSection({ addToCart, removeFromCart, searchResults = [] }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [showingAll, setShowingAll] = useState(false);
  const [bouncingWineId, setBouncingWineId] = useState(null);
  const containerRef = useRef(null);

  const whiteWines = Array.isArray(searchResults) ? searchResults.filter(wine => wine.tipology === 'Bianco') : [];
  const displayedWines = whiteWines.slice(0, visibleCount);

  const toggleWinesVisibility = () => {
    if (showingAll) {
      setVisibleCount(4);
      window.scrollTo({ top: 1000, behavior: 'smooth' });
    } else {
      setVisibleCount(whiteWines.length);
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
    setShowingAll(!showingAll);
  };

  const handleCardClick = (wineId) => {
    setBouncingWineId(wineId);
    setTimeout(() => {
      setBouncingWineId(null);
    }, 500);
  };

  return (
    <div className="contenitorecard" ref={containerRef}>
      <Row className="g-4">
        {displayedWines.length > 0 ? displayedWines.map((wine) => (
          <Col md={3} key={wine._id}>
            <Card
              className={`cardintera ${bouncingWineId === wine._id ? 'bounce' : ''}`}
              style={{ width: '100%' }}
              onClick={() => handleCardClick(wine._id)}
            >
              <Card.Img className="imgcard" variant="top" src={wine.image} />
              <Card.Body>
                <Card.Title>{wine.name}</Card.Title>
                <Card.Text>Tipo: {wine.tipology}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="list-item-year">Annata: {wine.year}</ListGroup.Item>
                <ListGroup.Item className="list-item-price">EUR: {wine.price}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Button className="bottonecarrello" variant="success" onClick={() => addToCart(wine)}>Aggiungi al Carrello</Button>
              </Card.Body>
            </Card>
          </Col>
        )) : (
          <p>Nessun vino bianco disponibile</p>
        )}
      </Row>
      <div className="contenitorebottone">
        <div className="lineabottone"></div>
        {whiteWines.length > 4 && (
          <Button variant="primary" className="bottonedipiù" onClick={toggleWinesVisibility}>
            {showingAll ? 'Visualizza di meno' : 'Visualizza di più'}
          </Button>
        )}
        <div className="lineabottone"></div>
      </div>
    </div>
  );
}
