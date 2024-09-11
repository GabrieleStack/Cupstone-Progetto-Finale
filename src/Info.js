import Card from 'react-bootstrap/Card';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Info() {
  return (
    <>
      <div className="contenitoreinfo">
        <Row className="contenutoinfo">
          <Col md={4}>
            <img
              src="https://image.freepik.com/foto-gratuito/bottiglia-di-vino-e-uva-sul-tavolo-di-legno_93675-25887.jpg"
              alt="Immagine di Wine Emporium"
              className='imginfo'
            />
          </Col>
          <Col md={4}>
            <Card className='cardinfo'>
              <Card.Body>
                <Card.Text>
                  Benvenuti al Wine Emporium, un'azienda agricola di vini che rappresenta l'eccellenza e la tradizione vitivinicola del nostro territorio. Fondata nel 1985, la nostra azienda è il frutto della passione e dell’impegno di tre generazioni di viticoltori, che hanno dedicato la loro vita alla produzione di vini di altissima qualità. Ogni bottiglia che produciamo è un testimone del nostro impegno per l'eccellenza e della nostra dedizione per l'arte vinicola.
                  La vinificazione avviene in cantine all'avanguardia, progettate per preservare e amplificare le migliori caratteristiche dei nostri vini.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <img
              src="https://th.bing.com/th/id/OIP.KiCkXqAhWe8I_72RjSY_CwHaEo?rs=1&pid=ImgDetMain"
              alt="Immagine di Wine Emporium"
              className='imginfo'
            />
          </Col>
        </Row>
      </div>

    <div className='separator'></div>

      <div className='contenitoreinfo2'>
        <Row className='contenutoinfo2'>
          <Col md={4}>
            <Card className='cardinfo2'>
              <Card.Body>               
                <Card.Title>
                  + di 10.000 prodotti venduti all'estero
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='cardinfo2'>
              <Card.Body>               
                <Card.Title>
                  A stretto contatto con le migliori aziende 
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='cardinfo2'>
              <Card.Body>               
                <Card.Title>
                  Qualità come priorita! e quantità a volontà!
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Info;

