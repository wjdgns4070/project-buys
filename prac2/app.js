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
const menuController = require('./controllers/menuController');
app.use('/', menuController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
