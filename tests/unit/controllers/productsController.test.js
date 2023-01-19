const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai)

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

//Mock
const { productMock, newProductsMock, insertMock } = require('../controllers/mocks/productsController.mock');

describe('Teste de unidade do productsController', function () {
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


  describe('Buscando uma produto', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {

      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findProductsById')
        .resolves({ type: null, message: newProductsMock });

      await productController.findProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductsMock);


    })

    it('Ao passar um id que nao existe deve retornar um erro', async function () {

      const res = {};
      const req = {
        params: { id: 9999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findProductsById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });


      await productController.findProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

  });

  describe('Cadastrando um novo produto', function () {
    it('Ao enviar dados validos deve salvar com sucesso!', async function () {
      const res = {};
      const req = {
        body: insertMock,
      };


      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'insertProduct')
        .resolves({ type: null, message: newProductsMock });

      await productController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductsMock);


    });

    it('ao enviar um nome com menos de 5 caracteres deve retornar um erro!', async function () {
     //Arrange
      const res = {};
      const req = {
        body: {
          name: 'Zé',
        }
      };

      //Duble
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'insertProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });

      //Act
      await productController.insertProduct(req, res);



      //Assert

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    })


  });
});