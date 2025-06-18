const router = require('express').Router();
const ProductController = require('../controllers/Product.controller');

router
  .get('/', ProductController.getAllProducts)
  .post('/', ProductController.createProduct)
  .get('/:category', ProductController.getProductsByCategory)
  .get('/:id', ProductController.getProductById)
  .put('/:id', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct);

module.exports = router;
