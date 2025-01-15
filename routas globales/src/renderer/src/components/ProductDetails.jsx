import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.list.find((product) => product.id === id)
  );

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <Card>
      <Card.Header>Detalles del Producto</Card.Header>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>Precio:</strong> ${product.price}
        </Card.Text>
        <Card.Text>
          <strong>Stock:</strong> {product.stock} unidades
        </Card.Text>
        <Link to="/">
          <Button variant="primary">Volver a la Lista</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;
