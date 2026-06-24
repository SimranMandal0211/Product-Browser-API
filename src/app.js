const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/products', productsRouter);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;