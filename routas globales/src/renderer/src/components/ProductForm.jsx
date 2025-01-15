import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../store/productsSlice';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProductForm = () => {
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      setError('El nombre es obligatorio.');
      return;
    }
    if (form.price <= 0) {
      setError('El precio debe ser mayor que 0.');
      return;
    }
    if (form.stock < 0) {
      setError('El stock no puede ser negativo.');
      return;
    }
    dispatch(createProduct(form)); // El `id` se asigna automáticamente en el slice
    setForm({ name: '', price: '', stock: '' });
    setError('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Añadir Producto
        </Button>
      </Form>
      <Link to="/">
        <Button variant="primary">Volver a la Lista</Button>
      </Link>
    </>
  );
};

export default ProductForm;
