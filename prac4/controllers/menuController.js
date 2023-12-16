const express = require('express');
const router = express.Router();
const menuModel = require('../models/menuModel');

router.get('/', (req, res) => {
    res.render('index', { menuItems: menuModel.getMenuItems() });
});

router.post('/addToCart', (req, res) => {
    const selectedItems = req.body['menu-item'];

    // 선택한 항목을 쿠키에 저장
    res.cookie('cart', JSON.stringify(selectedItems), { path: '/' });

    res.send('장바구니에 추가되었습니다!');
});

module.exports = router;
