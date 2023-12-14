// models/orderModel.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'kdt'
});

function getOrders() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM orders', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

function addOrder(order) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO orders (food_name) VALUES (?)', [order.foodName], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = { getOrders, addOrder };
