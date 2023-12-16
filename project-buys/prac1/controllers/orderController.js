// controllers/orderController.js
const express = require('express');
const router = express.Router();
const orderModel = require('../models/orderModel');

router.get('/', async (req, res) => {
  try {
    const orders = await orderModel.getOrders();
    res.render('cart', { orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/add', async (req, res) => {
  const { foodName } = req.body;

  try {
    await orderModel.addOrder({ foodName });
    res.status(200).send('Order added successfully');
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
