const express = require('express');
const productsRouter = require('./models/routes/productRouter');
const salesRouter = require('./models/routes/salesRouter');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productsRouter);
app.use('/products/:id', productsRouter);

app.use('/sales', salesRouter);
app.use('/sales/:id', salesRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;