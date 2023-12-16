// controllers/menuController.js
const express = require('express');
const router = express.Router();
const menuModel = require('../models/menuModel');

router.get('/', (req, res) => {
    res.render('index', { menuItems: menuModel });
});

router.post('/addToCart', (req, res) => {
    const selectedItems = req.body['menu-item'];
    
    // 선택한 항목을 쿠키에 저장
    res.cookie('cart', JSON.stringify(selectedItems), { expires: new Date(Date.now() + 900000), httpOnly: true });
    
    res.send('장바구니에 추가되었습니다!');
});

module.exports = router;
