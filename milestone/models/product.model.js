const mongodb = require('mongodb');
const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image; // the name of the image file
        this.updateImageDate();
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findById(productId) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(productId);
        } catch (error) {
            error.code = 404;
            throw error;
        }
        const product = await db.getDb().collection('products').findOne({ _id: prodId});

        if (!product) {
            const error = new Error('Could not find product with provided id.');
            error.code = 404;
            throw error;
        }
        return new Product(product);
    }

    static async findAll() {
        const products = await db.getDb().collection('products').find().toArray();
        return products.map(function(productDocument) {
            return new Product(productDocument);
            // imagePath와 imageUrl을 새로 만들기 위해서 이런 짓을 함
        });
    }

    updateImageDate() {
        this.imagePath = `product-data/images/${this.image}`
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };
        if (this.id) {
            const productId = new mongodb.ObjectId(this.id);

            if (!this.image) {
                // product data안의 key value 쌍을 삭제하는 것.
                delete productData.image;
            }

            await db.getDb().collection('products').updateOne({_id: productId}, { $set: productData})
        } else {
            await db.getDb().collection('products').insertOne(productData);
        }
    }

    async replaceImage(newImage) {
        this.image = newImage;
        this.updateImageDate();

    }

    async deleteData() {
        const productId = new mongodb.ObjectId(this.id);
        await db.getDb().collection('products').deleteOne({_id: productId});
    }
}

module.exports = Product;