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

const insertProduct = async (product) => {
  const error = schema.validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.insertProduct(product.name);
  const newProduct = await productsModel.findProductsById(newProductId);

  return { type: null, message: newProduct };
};

// Tive uma ajuda do Arthur Debiassi pra montar a função deleteProduct da Service
const deleteProduct = async (id) => {
  const product = await productsModel.findProductsById(id);
  console.log(product);
  
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  await productsModel.deleteProduct(id);

  return { type: null };
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
};