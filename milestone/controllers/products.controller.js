const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render("customer/products/all-products", {products: products});
    }catch (err) {
        return next(err);
    }
}

async function getProductDetails(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.render('customer/products/product-details', {product: product})
    }catch(err) {
        next(error);
    }
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails
};
