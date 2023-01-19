const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services/index');
const { salesModel } = require('../../../src/models/index');

// Mock
const { allSales, listSaleById } = require('./mocks/salesService.mock');

describe('Verificando service sales', function () {
  describe('listagem de sales', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('retorna lista completa de produtos', async function () {

      sinon.stub(salesModel, 'findAllSales').resolves(allSales)

      const result = await salesService.findAllSales();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });

    it('retorna um erro caso a venda não existe', async function () {

      const result = await salesService.findSalesById(7);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');


    });

    it('retorna a venda  caso ID existente', async function () {
      sinon.stub(salesModel, 'findSalesById').resolves(listSaleById)
  
      const result = await salesService.findSalesById(1);
  
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(listSaleById);
    });


  });
});
