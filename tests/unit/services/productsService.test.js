const { expect } = require('chai');
const sinon = require('sinon');

const { productService } = require('../../../src/services/index');
const { productsModel } = require('../../../src/models')

const { Allproducts } = require('./mocks/productsService.mock');

const connection = require('../../../src/models/connection');

// Importar o mock;

describe('Verificando service products', function () {
  describe('listagem de produtos', function () {
    it('retorna lista completa de produtos', async function () {
      sinon.stub(productsModel, 'findAllProducts').resolves(Allproducts)

      const result = await productService.findAllProducts();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(Allproducts);
    });
    afterEach(function () {
      sinon.restore();
    })
  });
});