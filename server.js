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
  res.render('login(n)');
})


// id
app.get('/findId', (req, res) => {
  res.render('findId');
})

app.get('/showId', (req, res) => {
  res.render('showId(n)');
})


// pw
app.get('/findPw', (req, res) => {
  res.render('findPw');
})

app.get('/changePw', (req, res) => {
  res.render('changePw');
})


// board
app.get('/board', (req, res) => {
  res.render('board(n)');
})

app.get('/board/write', (req, res) => {
  res.render('boardWrite');
})

app.get('/board/update', (req, res) => {
  res.render('boardUpdate');
})

app.get('/board/post', (req, res) => {
  res.render('boardPost(n)');
})


// gather
app.get('/gather', (req, res) => {
  res.render('gather(n)');
})

app.get('/gather/recruiting', (req, res) => {
  res.render('gatherRecruiting');
})

app.get('/gather/recruiting', (req, res) => {
  res.render('gatherRecruiting(n)');
})

app.get('/gather/completed', (req, res) => {
  res.render('gatherCompleted(n)');
})

app.get('/gather/create', (req, res) => {
  res.render('gatherCreate');
})

app.get('/gather/mine', (req, res) => {
  res.render('gatherMine');
})

// gather chat
app.get('/gather/chat/list', (req, res) => {
  res.render('chatList');
})


app.get('/gather/chat/room', (req, res) => {
  res.render('chat(n)');
})


// notice
app.get('/notice', (req, res) => {
  res.render('notice(n)');
})

app.get('/notice/update', (req, res) => {
  res.render('noticeUpdate');
})

app.get('/notice/view', (req, res) => {
  res.render('noticeView(n)');
})

app.get('/notice/write', (req, res) => {
  res.render('noticeWrite');
})


// recipe
app.get('/recipe', (req, res) => {
  res.render('recipe');
})

app.get('/recipe/list', (req, res) => {
  res.render('recipeList');
})

app.get('/recipe/write', (req, res) => {
  res.render('recipeWrite');
})

app.get('/recipe/view', (req, res) => {
  res.render('recipeView');
})

app.get('/recipe/update', (req, res) => {
  res.render('recipeUpdate');
})


app.get('/aaa', (req, res) => {
  res.render('aaa');
})