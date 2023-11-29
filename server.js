const http = require('http');
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')

const app = express();
const server = http.createServer(app);

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

// app.use(express.static(__dirname + ''));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);

//express-ejs-layouts setting
app.set('layout', 'layout');
app.set("layout extractScripts", true);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



app.get('/', (req, res) => {
  res.render('index');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.get('/login', (req, res) => {
  res.render('login');
})


// id
app.get('/findId', (req, res) => {
  res.render('findId');
})

app.get('/showId', (req, res) => {
  res.render('showId');
})


// pw
app.get('/findPw', (req, res) => {
  res.render('findPw');
})

app.get('/changePw', (req, res) => {
  res.render('changePw');
})



app.get('/board', (req, res) => {
  res.render('board');
})

app.get('/board/write', (req, res) => {
  res.render('boardWrite');
})

app.get('/board/write/edit', (req, res) => {
  res.render('boardEdit');
})

app.get('/board/post', (req, res) => {
  res.render('boardPost');
})


// gather
app.get('/gather', (req, res) => {
  res.render('gatherMain');
})

app.get('/gather/recruiting', (req, res) => {
  res.render('gatherRecruiting');
})

app.get('/chat', (req, res) => {
  res.render('chat');
})

app.get('/chat/list', (req, res) => {
  res.render('chatList');
})

app.get('/gather/recruiting', (req, res) => {
  res.render('gatherRecruiting');
})

app.get('/gather/completed', (req, res) => {
  res.render('gatherCompleted');
})

app.get('/gather/create', (req, res) => {
  res.render('gatherCreate');
})


// notice
app.get('/notice', (req, res) => {
  res.render('noticeList');
})

app.get('/notice/update', (req, res) => {
  res.render('noticeUpdate');
})

app.get('/notice/view', (req, res) => {
  res.render('noticeView');
})

app.get('/notice/write', (req, res) => {
  res.render('noticeWrite');
})
