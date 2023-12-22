const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./controllers/menuController'); // 수정된 부분

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', router); // 수정된 부분

app.get('/black_jack', (req, res) => {
    res.render('black_jack'); // 'black_jack'는 실제 파일 이름과 일치해야 합니다.
  });
  
  app.get('/index', (req, res) => {
    res.render('index'); // 'index'는 음식주문 페이지의 뷰 파일 이름과 일치해야 합니다.
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
