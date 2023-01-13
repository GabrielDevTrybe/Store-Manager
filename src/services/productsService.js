const productsModel = require('../models/productsModels');

const findAllProducts = async () => {
  const products = await productsModel.findAllProducts();

  return products;
};

const findProductsById = async (productsId) => {
  const product = await productsModel.findProductsById(productsId);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  findAllProducts,
  findProductsById,
};