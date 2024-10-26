const request = require('supertest');
const app = require('../server');

describe('Product API Endpoints', () => {
  

  const mockProduct = {
    name: "Test Product",
    description: "A sample product for testing",
    price: 100,
    quantity: 5
  };

  it('should fetch all products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Check if response is an array
  });

  // Test for POST /products
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .send(mockProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Product added successfully!');
    expect(response.body).toHaveProperty('newProduct');
    expect(response.body.newProduct).toHaveProperty('name', mockProduct.name);
  });

  // Test for PUT /products/:id
  it('should update an existing product', async () => {
    // First, create a product to update
    const createResponse = await request(app).post('/products').send(mockProduct);
    const productId = createResponse.body.newProduct.id;

    // Define the updated product data
    const updatedProduct = { ...mockProduct, price: 150 };

    // Perform the update
    const updateResponse = await request(app)
      .put(`/products/${productId}`)
      .send(updatedProduct);
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toHaveProperty('message', 'Product updated successfully!');
  });

  // Test for DELETE /products/:id
  it('should delete a product', async () => {
    // First, create a product to delete
    const createResponse = await request(app).post('/products').send(mockProduct);
    const productId = createResponse.body.newProduct.id;

    // Perform the delete operation
    const deleteResponse = await request(app).delete(`/products/${productId}`);
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', 'Product deleted successfully!');
  });
});
