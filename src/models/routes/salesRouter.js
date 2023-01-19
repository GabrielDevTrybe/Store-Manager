const express = require('express');
const salesController = require('../../controllers/salesController');

const router = express.Router();

router.get('/', salesController.findAllSales);
router.get('/:id', salesController.findSalesById);

module.exports = router;