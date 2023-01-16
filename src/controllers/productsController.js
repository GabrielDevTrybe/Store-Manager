const productsService = require('../services/productsService');
const { mapError } = require('../utils/errorMap');

const findAllProducts = async (_req, res) => {
  const { type, message } = await productsService.findAllProducts();

  if (type) return res.status(500).json(message);

  return res.status(200).json(message);
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