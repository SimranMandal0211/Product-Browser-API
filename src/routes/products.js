const express  = require('express');
const router = express.Router();
const { getProductsPage } = require('../services/productService');

router.get('/', async (req, res) => {
    try{
        const { category, cursor, limit } = req.query;
        const parsedLimit = limit ? parseInt(limit, 10) : 20;
        const safeLimit = Math.min(Math.max(parsedLimit, 1), 100);

        const reuslt = await getProductsPage({
            category, 
            cursor, 
            limit: safeLimit,
        });

        res.json({
            items: reuslt.items,
            nextCursor: reuslt.nextCursor,
            hasNextPage: reuslt.hasNExtPage,
        });
    }catch(err){
        console.error('Error fetching products: ', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;