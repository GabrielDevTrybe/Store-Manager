const productsService = require('../services/productsService');
const { mapError } = require('../utils/errorMap');

const findAllProducts = async (_req, res) => {
  const products = await productsService.findAllProducts();

  return res.status(200).json(products);
};

const findProductsById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.findProductsById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  findAllProducts,
  findProductsById,
};