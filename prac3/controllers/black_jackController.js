// controllers/black_jackController.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('black_jack'); // 'black_jack'는 실제 파일 이름과 일치해야 합니다.
});

module.exports = router;
