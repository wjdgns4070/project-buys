const express = require('express');
const router = express.Router();
const menuModel = require('../models/menuModel');
const mysql = require('mysql2/promise');

// MySQL Pool 생성
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'user',
    password: '1234',
    database: 'kdt',
    connectionLimit: 10,
});

// 서버 시작 시 테이블 생성 체크
async function checkAndCreateTable() {
    const connection = await pool.getConnection();

    try {
        // purchases 테이블이 존재하는지 확인
        const [rows] = await connection.execute("SHOW TABLES LIKE 'purchases'");
        if (rows.length === 0) {
            // purchases 테이블이 없으면 생성
            await connection.execute(`
                CREATE TABLE purchases (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    price DECIMAL(10, 2) NOT NULL
                )
            `);
            console.log('purchases 테이블이 생성되었습니다.');
        }
    } catch (error) {
        console.error('테이블 생성 오류:', error);
    } finally {
        connection.release();
    }
}

// 서버 시작 시 테이블 생성 체크 호출
checkAndCreateTable();

router.get('/', (req, res) => {
    res.render('index', { menuItems: menuModel });
});

router.post('/purchase', async (req, res) => {
    const purchasedItems = req.body;

    console.log('Received purchase request:', purchasedItems);

    try {
        if (!Array.isArray(purchasedItems) || purchasedItems.length === 0) {
            res.status(400).send('구매할 항목이 없습니다.');
            return;
        }

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        for (const item of purchasedItems) {
            const query = 'INSERT INTO purchases (name, price) VALUES (?, ?)';
            await connection.execute(query, [item.name, item.price]);
        }

        await connection.commit();
        connection.release();

        res.status(200).send('구매가 완료되었습니다!');
    } catch (error) {
        console.error('MySQL INSERT 오류:', error);

        try {
            if (connection) {
                await connection.rollback();
                connection.release();
            }
        } catch (rollbackError) {
            console.error('Rollback 오류:', rollbackError);
        }

        res.status(500).send('구매 중 오류가 발생했습니다.');
    }
});


// ----------------------------------------



// ----------------------------------------
module.exports = router;