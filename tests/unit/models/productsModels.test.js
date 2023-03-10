const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models/index');
// const productsModel = require('../../../src/models/productsModels');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/productsModel.mock');


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

  it('Cadastrando um produto novo', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const result = await productsModel.insertProduct(newProduct);

    expect(result).to.equal(42);
  });

  it('Deletando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModel.deleteProduct(1);

    expect(result).to.be.deep.equal({ affectedRows: 1 });
  });


  afterEach(function () {
    sinon.restore();
  })
});