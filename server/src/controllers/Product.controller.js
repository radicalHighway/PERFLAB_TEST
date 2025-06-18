const ProductService = require('../services/Products.service');
const formatResponse = require('../utils/formatResponse');
const isValidId = require('../utils/isValidId');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAll();
      if (products.length === 0) {
        return res.status(200).json(formatResponse(200, 'No tasks found', []));
      }
      res.status(200).json(formatResponse(200, 'success', products));
    } catch (message) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
  static async getProductById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid product ID'));
    }

    try {
      const product = await ProductService.getById(+id);

      if (!product) {
        return res
          .status(404)
          .json(formatResponse(404, `Product with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, 'success', product));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createProduct(req, res) {
    const { title, description, category, price } = req.body;

    try {
      const newProduct = await ProductService.create({
        title,
        description,
        category,
        price,
      });

      if (!newProduct) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new product`));
      }

      res.status(201).json(formatResponse(201, 'success', newProduct));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const { title, description, category, price } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid product ID'));
    }

    try {
      const updatedProduct = await ProductService.update(+id, {
        title,
        description,
        category,
        price,
      });

      if (!updatedProduct) {
        return res
          .status(404)
          .json(formatResponse(404, `Task with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, 'success', updatedProduct));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid product ID'));
    }

    try {
      const deletedProduct = await ProductService.delete(+id);

      if (!deletedProduct) {
        return res
          .status(404)
          .json(formatResponse(404, `Product with id ${id} not found`));
      }

      res
        .status(200)
        .json(formatResponse(200, `Task with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getProductsByCategory(req, res) {
    const { category } = req.query;

    try {
      let products;
      if (category && category.toLowerCase() !== 'all') {
        products = await ProductService.getByCategory(category);
      } else {
        products = await ProductService.getAll();
      }

      if (products.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'No products found', []));
      }

      res.status(200).json(formatResponse(200, 'success', products));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}
module.exports = ProductController;
