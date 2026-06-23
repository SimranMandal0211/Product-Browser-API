const Product = require('../models/Product');
const { decodeCursor, encodeCursor } = require('../utils/cursor');

async function getProductsPage({ category, cursor, limit = 20 }){
    const query = {};

    if(category){
        query.category = category;
    }

    if(cursor){
        const { createdAt, _id } = decodeCursor(cursor);
        query.$or = [
            { createdAt: { $lt: createdAt }},
            { createdAt: createdAt, _id: { $lt: _id}},
        ];
    }

    const products = await Product.find(query)
    .sort({ created: -1, _id: -1 })
    .limit(limit + 1)
    .lean();

    const hasNextPage = products.length > limit;
    const pageItems = hasNextPage ? products.slice(0, limit) : products;

    const nextCursot = hasNextPage ? encodeCursor(pageItems[pageItems.length - 1]) : null;

    return {
        items: pageItems,
        nextCursor,
        hasNextPage,
    };
}

module.exports = { getProducctPage };