const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const purchaseController = require('./controllers/purchaseController'); // 경로를 실제 프로젝트에 맞게 수정
const menuController = require('./controllers/menuController');
app.use('/', menuController);
app.use('/', purchaseController); // '/api'는 실제 사용하고자 하는 경로로 수정

app.get('/', (req, res) => {
    const itemData = [
      { id: 1, name: '피자', price: 10 },
      { id: 2, name: '햄버거', price: 5 },
      { id: 3, name: '샐러드', price: 8 },
    ];
  
    res.render('index', { itemData });
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
