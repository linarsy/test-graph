import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => (
  <Navbar expand="lg" variant="dark" bg="info" sticky="top">
    <Container>
      <Navbar.Brand href="#" className="font-weight-bold">Graph</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
