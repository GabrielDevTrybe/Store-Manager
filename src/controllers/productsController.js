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

const insertProduct = async (req, res) => {
  const { type, message } = await productsService.insertProduct(req.body);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(mapError(type)).json({ message });
  res.status(204).end();
};

const updateProduct = async (req, res) => {
  const { type, message } = await productsService.updateProduct(req.body, Number(req.params.id));

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
  updateProduct,
};