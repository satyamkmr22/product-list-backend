const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const newProduct = await Product.create({ name, description, price, quantity });
    res.status(201).json({ message: 'Product added successfully!', newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({ name, description, price, quantity });
      res.status(200).json({ message: 'Product updated successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await Product.destroy({ where: { id } });
    if (rowsDeleted) {
      res.status(200).json({ message: 'Product deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
