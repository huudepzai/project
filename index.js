const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
var flash = require('connect-flash');
var session = require('express-session');

require('dotenv').config();
const config = require('./config.js');
app.use(express.static('./public'));
var huudepzai = require('./modules/huudepzai.js');
app.use(session({
	secret : process.env.SERECT,
	saveUninitialized: true,
	resave: true
}))

//kết nối database sử dụng sequelize
global.Sequelize = require('sequelize');
global.db  = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.SERECT,
	define: {
		timestamps: false
	},
	dialectOptions:{
		ssl:false
	}
});
db.authenticate()
.then(()=>console.log('Kết nối thành công!'))
.catch((err) => console.log(err.message))

app.use(flash());
app.use(function (req,res,next) {
	res.locals.messages = req.flash('messages');
	delete req.session.flash;
	next()
})

nunjucks.configure('app/views', {
	autoescape: true,
	express: app
});

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var frontend = require('./routers/home');
app.use('/',frontend);
var admin = require('./routers/admin');
app.use('/admin/',admin);
app.listen(3000, () => console.log('connect!'));