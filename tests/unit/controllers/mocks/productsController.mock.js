const productMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const insertMock = [
  {
    id: 5,
    name: 'ProdutoNovo'
  }
];

const newProductsMock = { id: 1, ...productMock };

const productListMock = [newProductsMock]

module.exports = {
  productMock,
  newProductsMock,
  productListMock,
  insertMock,
};
