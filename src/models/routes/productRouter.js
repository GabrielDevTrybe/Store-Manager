const express = require('express');
const productsController = require('../../controllers/productsController');

const router = express.Router();

// Products
router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.findProductsById);
router.post('/', productsController.insertProduct);
router.delete('/:id', productsController.deleteProduct);
router.put('/:id', productsController.updateProduct);

module.exports = router;