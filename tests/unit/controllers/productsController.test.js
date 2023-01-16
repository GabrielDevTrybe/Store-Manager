const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai)

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

//Mock
const { productMock } = require('../controllers/mocks/productsController.mock');

describe('Teste de unidade do passengerController', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Listando os produtos', function () {

    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAllProducts')
        .resolves({ type: null, message: productMock });
      
      await productController.findAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock);


    })

  })
})