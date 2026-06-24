function encodeCursor(product){
    const payload = `${product.createdAt.toISOString()}_${product._id.toString()}`;
  return Buffer.from(payload).toString('base64');
}

function decodeCursor(cursorString){
    const decoded = Buffer.from(cursorString, 'base64').toString('utf-8');
    const [createdAtStr, id] = decoded.split('_');
    
    return {
        createdAt: new Date(createdAtStr),
        _id: id,
    };
}

module.exports = { encodeCursor, decodeCursor };
