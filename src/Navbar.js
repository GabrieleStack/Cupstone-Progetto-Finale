import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';

function NavBar({ onSearch, showSearch, cartTotal, isAuthenticated, onLogout }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [registrationData, setRegistrationData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = React.useState({ email: '', password: '' });
  const [loginError, setLoginError] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });
      const result = await response.json();
      if (result.success) {
        alert('Registrazione avvenuta con successo');
        setShowRegisterModal(false);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('registrationData', JSON.stringify(registrationData));
        window.location.reload(); // Aggiorna la pagina per riflettere i cambiamenti
      } else {
        setRegisterError(result.message || 'Errore nella registrazione');
      }
    } catch (error) {
      console.error('Errore nella registrazione:', error);
      setRegisterError('Errore durante la registrazione');
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const result = await response.json();
      if (result.success) {
        alert('Accesso avvenuto con successo');
        setShowLoginModal(false);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('registrationData', JSON.stringify(result.user));
        window.location.reload(); // Aggiorna la pagina per riflettere i cambiamenti
      } else {
        setLoginError(result.message || 'Errore durante l\'accesso');
      }
    } catch (error) {
      console.error('Errore durante l\'accesso:', error);
      setLoginError('Errore durante l\'accesso');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar fixed-top" style={{ backgroundColor: '#f8f9fa' }}>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto d-flex align-items-center" style={{ width: '100%', justifyContent: 'space-between' }}>
              <div className="link d-flex align-items-center">
                <Nav.Link as={Link} to="/" className='home me-3'>Home</Nav.Link>
                <Nav.Link as={Link} to="/info" className='me-3'>Chi Siamo</Nav.Link>
                <Nav.Link as={Link} to="/cart" className='carrello'>
                  <span>Carrello: €{cartTotal.toFixed(2)}</span>
                </Nav.Link>
              </div>

              <h1 className='h1 text-center' style={{ margin: '0 auto' }}>Wine Emporium</h1>

              <div className="d-flex align-items-center">
                {isAuthenticated ? (
                  <>
                    <Button className='account me-3' variant="outline-primary" as={Link} to="/account">Account</Button>
                    <Button className='logout me-3' variant="outline-danger" onClick={onLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button className='registrati me-3' variant="outline-primary" onClick={() => setShowRegisterModal(true)}>Registrati</Button>
                    <Button className='accedi me-3' variant="outline-primary" onClick={() => setShowLoginModal(true)}>Accedi</Button>
                  </>
                )}
              </div>
            </Nav>
            {showSearch && (
              <Form className="d-flex ms-auto" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Che vino cerchi?"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-success" type="submit">Cerca</Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal di Registrazione */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrati</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                name="firstName"
                value={registrationData.firstName}
                onChange={handleRegisterChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo cognome"
                name="lastName"
                value={registrationData.lastName}
                onChange={handleRegisterChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                name="email"
                value={registrationData.email}
                onChange={handleRegisterChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la tua password"
                name="password"
                value={registrationData.password}
                onChange={handleRegisterChange}
                required
              />
            </Form.Group>
            {registerError && <p className="text-danger">{registerError}</p>}
            <Button variant="primary" type="submit">Registrati</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal di Login */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formLoginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la tua password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </Form.Group>
            {loginError && <p className="text-danger">{loginError}</p>}
            <Button variant="primary" type="submit">Accedi</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
