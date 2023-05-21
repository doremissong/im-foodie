const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

//controller
const errorController = require('./controllers/errorController');

// setting
app.set("port", process.env.PORT||3000);
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 라우팅
app.get("/",(req, res)=>{
    res.render("index");
})

// error
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// 
app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`);
})