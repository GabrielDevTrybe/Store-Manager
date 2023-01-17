const express = require('express');
const productsController = require('../../controllers/productsController');

const router = express.Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.findProductsById);
router.post('/', productsController.insertProduct);

module.exports = router;