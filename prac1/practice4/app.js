// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const menuController = require('./controllers/menuController');
const orderController = require('./controllers/orderController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MySQL 연결 설정
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'kdt'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/menu', menuController);
app.use('/order', orderController);

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('User connected');
  // Handle socket events (e.g., order updates)
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
