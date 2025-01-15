import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, updateProduct, sortProducts } from '../store/productsSlice';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ProductList = () => {
  const { list: products, sortField, sortOrder } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleSort = (field) => {
    dispatch(sortProducts({ field }));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProduct(currentProduct));
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const renderSortIndicator = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return null;
  };

  return (
    <div>
        <div className="d-flex justify-content-between mb-3">
        <h2>Lista de Productos</h2>
        <Link to="/create-product">
          <Button variant="primary">Nuevo Producto</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Nombre {renderSortIndicator('name')}
            </th>
            <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
              Precio {renderSortIndicator('price')}
            </th>
            <th onClick={() => handleSort('stock')} style={{ cursor: 'pointer' }}>
              Stock {renderSortIndicator('stock')}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} id={product.id}>
              <td>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar productos */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form onSubmit={handleSave}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={currentProduct.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
