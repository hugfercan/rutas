import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';


const App = () => {
  return (
    <Router>
      <Container className="mt-4">
        <h1 className="text-center mb-4">Gestión de Productos</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<ProductForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
