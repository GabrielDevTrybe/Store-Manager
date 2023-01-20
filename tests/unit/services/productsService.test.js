const { expect } = require('chai');
const sinon = require('sinon');


const { productService } = require('../../../src/services/index');
const { productsModel } = require('../../../src/models/index');

const { Allproducts, invalidValue, validName, validID } = require('./mocks/productsService.mock');

// const connection = require('../../../src/models/connection');

// Importar o mock;

describe('Verificando service products', function () {
  describe('listagem de produtos', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('retorna lista completa de produtos', async function () {

      sinon.stub(productsModel, 'findAllProducts').resolves(Allproducts)

      const result = await productService.findAllProducts();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(Allproducts);
    });

    it('retorna um erro caso receba um ID inválido', async function () {

      const result = await productService.findProductsById('a');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');


    });

    it('retorna um erro caso a pessoa passageira não existe', async function () {

      const result = await productService.findProductsById(7);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');


    });

    it('retorna a pessoa passageira caso ID existente', async function () {
      sinon.stub(productsModel, 'findProductsById').resolves(Allproducts[0])

      const result = await productService.findProductsById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(Allproducts[0]);
    });


    it('retorna um erro ao deletar um produto que nao existe', async function () {
      sinon.stub(productsModel, 'findAllProducts').resolves(Allproducts)

      const result = await productService.deleteProduct(8);


      expect(result).to.be.deep.equal({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

    })

  });

  describe('Cadastro de um produto com valores invalidos', function () {
    it('Retorna um erro ao passar um nome inválido', async function () {
      const result = await productService.insertProduct(invalidValue);

      expect(result.type).to.equal('UNDEFINED_VALUE');
      expect(result.message).to.equal('"value" must be of type object');
    });
  });
});