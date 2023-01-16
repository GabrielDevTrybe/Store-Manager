const productsModel = require('../models/productsModels');
const schema = require('./validations/validationsInputValues');

const findAllProducts = async () => {
  const products = await productsModel.findAllProducts();

  return { type: null, message: products };
};

const findProductsById = async (productsId) => {
  const error = schema.validateId(productsId);
  if (error.type) return error;

  const product = await productsModel.findProductsById(productsId);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  findAllProducts,
  findProductsById,
};