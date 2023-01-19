const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai)

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers/');

// Mock
const { listSales, listSaleById } = require('./mocks/salesController.mock');

describe('Teste de unidade do salesController', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Listando as sales', function () {

    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAllSales')
        .resolves({ type: null, message: listSales });

      await salesController.findAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listSales);


    })

    
  })

  describe('Buscando uma sale', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {

      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findSalesById')
        .resolves({ type: null, message: listSaleById });

      await salesController.findSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listSaleById);


    });

  });
});