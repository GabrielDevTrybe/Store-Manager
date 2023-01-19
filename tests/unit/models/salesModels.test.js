const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');

// Mock aqui
const { listSales, listSaleById } = require('./mocks/salesMocels.mock');


describe('Testes de unidade do model de sales', function () {
  it('Recuperando a lista de sales', async function () {
    sinon.stub(connection, 'execute').resolves([listSales]);

    const result = await salesModel.findAllSales();
    expect(result).to.be.deep.equal(listSales);
  });

  it('Recuperando um sale a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([listSaleById]);

    const result = await salesModel.findSalesById(1);

    expect(result).to.be.deep.equal(listSaleById);
  })

  afterEach(function () {
    sinon.restore();
  })

});



// describe('Testes de unidade do model de produtos', function () {
//   it('Recuperando a lista de produtos', async function () {
//     sinon.stub(connection, 'execute').resolves([products]);

//     const result = await productsModel.findAllProducts();
//     expect(result).to.be.deep.equal(products);
//   });