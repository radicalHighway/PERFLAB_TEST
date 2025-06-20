const router = require('express').Router();
const productRouter = require('./product.routes');
const formatResponse = require('../utils/formatResponse');

router.use('/products', productRouter);

router.use((req, res)=>{
  res.status(404).json(formatResponse(404, 'Not Found'))
});
module.exports = router