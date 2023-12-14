// controllers/menuController.js
const express = require('express');
const router = express.Router();
const menuModel = require('../models/menuModel');

router.get('/', (req, res) => {
  const menuItems = menuModel.getMenuItems();
  res.render('index', { menuItems }); // menuItems를 index.ejs로 전달
});

module.exports = router;
