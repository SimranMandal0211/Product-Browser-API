const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        required : true,
        index: true,
    },
    price: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    }
);

// Component index: supports "all products, newest first" pagination
productSchema.index({ createdAt: -1 , _id: -1});

// component index: supports "product in category X, newest first" pagination
productSchema.index({ category: 1, createdAt: -1, _id: -1});


module.exports = mongoose.model('Product', productSchema);