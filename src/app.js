const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.json());
app.use('/products', productsRouter);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;