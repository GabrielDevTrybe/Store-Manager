const salesModels = require('../models/salesModels');
// const schema = require('./validations/validationsInputValues');

const findAllSales = async () => {
  const sales = await salesModels.findAllSales();

  return { type: null, message: sales };
};

const findSalesById = async (id) => {
  const list = await salesModels.findSalesById(id);
  if (!list[0]) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: list };
};

module.exports = {
  findAllSales,
  findSalesById,
};