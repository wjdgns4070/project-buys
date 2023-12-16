const db = require('../data/database');

class Order {
    // status => pending, fulfilled, cancelled
    constructor(cart, userData, status='pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        this.id = orderId;
    }

    async save() {
        if (this.id) {
            //updating
        } else {
            const orderDocucment = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };

            return await db.getDb().collection('orders').insertOne(orderDocucment);
        }
    }
}

module.exports = Order;