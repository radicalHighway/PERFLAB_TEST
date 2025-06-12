const router = require('express').Router();
const ProductController = require("../controllers/Product.controller")


router
  .get('/', ProductController.getAllProducts)
  .get ('/:id', ProductController.getProductById)
  .post('/',ProductController.createProduct)
  .put('/:id', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct)

  module.exports = router