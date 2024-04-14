const { default: mongoose } = require("mongoose");

const product_schema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    url: {
        type: String,
        unique: true
    },
    store: String, 

});

const Product = mongoose.model('Product', product_schema);

module.exports = Product;


