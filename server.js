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


// member
app.get('/signup', (req, res) => {
  res.render('member/signup');
})

app.get('/login', (req, res) => {
  res.render('member/login(n)');
})


// id
app.get('/findId', (req, res) => {
  res.render('member/findId');
})

app.get('/showId', (req, res) => {
  res.render('member/showId(n)');
})


// pw
app.get('/findPw', (req, res) => {
  res.render('member/findPw');
})

app.get('/changePw', (req, res) => {
  res.render('member/changePw');
})


// board
app.get('/board', (req, res) => {
  res.render('board/board(n)');
})

app.get('/board/write', (req, res) => {
  res.render('board/boardWrite');
})

app.get('/board/update', (req, res) => {
  res.render('board/boardUpdate');
})

app.get('/board/post', (req, res) => {
  res.render('board/boardPost(n)');
})


// gather
app.get('/gather', (req, res) => {
  res.render('gather/gather(n)');
})


app.get('/gather/recruiting', (req, res) => {
  res.render('gather/gatherRecruiting(n)');
})

app.get('/gather/completed', (req, res) => {
  res.render('gather/gatherCompleted(n)');
})

app.get('/gather/create', (req, res) => {
  res.render('gather/gatherCreate');
})

app.get('/gather/mine', (req, res) => {
  res.render('gather/gatherMine(n)');
})

app.get('/gather/imade', (req, res) => {
  res.render('gather/gatherImade(n)');
})

app.get('/gather/joined', (req, res) => {
  res.render('gather/gatherJoined(n)');
})

app.get('/gather/applied', (req, res) => {
  res.render('gather/gatherApplied(n)');
})


app.get('/gather/view', (req, res) => {
  res.render('gather/gatherView(n)');
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
  res.render('notice/notice(n)');
})

app.get('/notice/update', (req, res) => {
  res.render('notice/noticeUpdate');
})

app.get('/notice/view', (req, res) => {
  res.render('notice/noticeView(n)');
})

app.get('/notice/write', (req, res) => {
  res.render('notice/noticeWrite');
})


// recipe
app.get('/recipe', (req, res) => {
  res.render('recipe/recipe');
})

app.get('/recipe/list', (req, res) => {
  res.render('recipe/recipeList(n)');
})

app.get('/recipe/write', (req, res) => {
  res.render('recipe/recipeWrite');
})

app.get('/recipe/view', (req, res) => {
  res.render('recipe/recipeView(n)');
})

app.get('/recipe/update', (req, res) => {
  res.render('recipe/recipeUpdate');
})


app.get('/formtest', (req, res) => {
  res.render('formtest');
})

app.get('/test', (req, res) => {
  res.render('test');
})


// 마이룸
app.get('/myroom', (req, res) => {
  res.render('myroom/myroom');
})

app.get('/myroom/changePw', (req, res) => {
  res.render('myroom/myroomCPW');
})

app.get('/myroom/pwcheckM', (req, res) => {
  res.render('myroom/myroomPCM');
})

app.get('/myroom/modify', (req, res) => {
  res.render('myroom/myroomModify');
})

app.get('/myroom/pwcheckW', (req, res) => {
  res.render('myroom/myroomPCW');
})

app.get('/myroom/withdraw', (req, res) => {
  res.render('myroom/myroomWithdraw');
})

app.get('/myroom/board/post', (req, res) => {
  res.render('myroom/myroomBPost');
})

app.get('/myroom/board/comment', (req, res) => {
  res.render('myroom/myroomBComment');
})

app.get('/myroom/board/Like', (req, res) => {
  res.render('myroom/myroomBLike');
})

