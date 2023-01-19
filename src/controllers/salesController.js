const salesService = require('../services/salesService');
const { mapError } = require('../utils/errorMap');

const findAllSales = async (_req, res) => {
  const { type, message } = await salesService.findAllSales();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSalesById(id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  findAllSales,
  findSalesById,
};