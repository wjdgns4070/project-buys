// controllers/menuController.js
const express = require('express');
const router = express.Router();
const menuModel = require('../models/menuModel');

router.get('/', (req, res) => {
  const menuItems = menuModel.getMenuItems(); // getMenuItems() 메소드를 호출하여 menuItems를 가져오기
  res.render('index', { menuItems }); // menuItems를 index.ejs로 전달
});

module.exports = router;
