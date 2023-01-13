const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models/index');
// const productsModel = require('../../../src/models/productsModels');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/productsModel.mock');


describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.findAllProducts();
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.findProductsById(1);

    expect(result).to.be.deep.equal(products[0]);
  })
  afterEach(function () {
    sinon.restore();
  })
});