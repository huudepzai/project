const bcrypt = require('bcrypt');
const multer  = require('multer');
var path = require('path');
const config = require('../../config.js');
const functions = require('../functions/functions.js');

const Member = require('../models/User.js');
const Category = require('../models/Category.js');
const New = require('../models/New.js');
const Configweb = require('../models/Configweb.js');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/data/news')
	},
	filename: function (req, file, cb) {
		var time = new Date().getTime();
		cb(null, time+'-'+file.originalname);
	}
});

const storage2 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/data/logo')
	},
	filename: function (req, file, cb) {
		var time = new Date().getTime();
		cb(null, time+'-'+file.originalname);
	}
});

var fileLoad = multer({
	storage: storage,
	fileFilter: function(req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback(req.fileValidationError='Tập tin không đúng định dạng', null)
		}
		callback(null, true)
	}
}).single('newpicture');

var fileLoadLogo = multer({
	storage: storage2,
	fileFilter: function(req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback(req.fileValidationError='Tập tin không đúng định dạng', null)
		}
		callback(null, true)
	}
}).single('logo');



exports.index = function(req,res){
	res.render('admin/pages/index.html');
	return;
}

exports.register = function(req, res) {
	var username = 'admin';
	var email = 'abcdef@gmail.com';
	var fullname = 'Administrator';
	var password = 'admin@123123';
	var profileImage = 'noavatar.png';
	var code = new Date().getTime();
	bcrypt.hash(password,10, function (err, hash) {
		if(err) {
			res.send('Lỗi hãy thử lại!');

		}else{
			Member.add(username,fullname,hash,email,profileImage,(err,rs)=>{
				if(err){
					res.json({err:true,msg:err});
					return false;
				}
				res.json({err:false,msg:'Đăng ký thành công bạn có thể đăng nhập để tiếp tục'});
			});
		}
	})
}

exports.login = function(req, res) {
	res.render('admin/pages/login.html',{urlAdmin:config.urlAdmin});
}

exports.postlogin = function(req, res) {
	Member.find(req.body.username,(err,rs)=>{
		if(rs){
			bcrypt.compare(req.body.password, rs.password, function (err,result) {
				if (err) { 
					return res.redirect('/admin/login');
				}
				if(!result) {
					return res.redirect('/admin/login');
				}else{
					req.session.userId = rs.id;
					return res.redirect('/admin/index');
				}
			})
		}
	})
}

//cấu hình website
exports.configWeb = function(req,res) {
	res.render('admin/pages/config.html');
}

exports.postConfigWeb = function(req,res){
		fileLoadLogo(req, res, function (err) {
		if (err) {
			res.send("Lôi hãy thử lai!");
		}
		else{
			if (req.file) {
				var logo = req.file.filename;
			} else {
				var logo = req.body.image;
			}
			const params = {
				title: req.body.title,
				description: req.body.description,
				keyword: req.body.keyword,
				logo: logo
			}
			Configweb.update(params,(err,rs)=>{
				if(err){
					req.flash('messages','Đã có lỗi xảy ra xin thử lại!');
					res.redirect('configWeb');
				}else{
					req.flash('messages','Cập nhập thành công!');
					res.redirect('configWeb');
				}
			})
		}
	})
}


//danh mục sản phẩm
exports.addCategory = function(req,res){
	Category.getList((err,rs)=>{
		var category = functions.dequy(rs,0);
		console.log(category);
		res.render('admin/pages/category.html',{category:category});
	})

}
exports.updateCategory = function(req,res){
	Category.add({name:req.body.title,keyword:req.body.keyword,description:req.body.description,parent_id:req.body.parent_id,slug:functions.xoadau(req.body.title)},(err,rs)=>{
		if(err){
			req.flash('messages','Đã có lỗi xảy ra xin thử lại!');
			res.redirect('category');
		}else{
			req.flash('messages','Cập nhập thành công!');
			res.redirect('category');
		}
	})
}
//Blog
exports.addNew = function(req,res){
	Category.getList((err,rs)=>{
		var category = functions.dequy(rs,0);
		console.log(category);
		res.render('admin/pages/new.html',{category:category});
	})	
}
exports.updateNew = function(req,res){
	fileLoad(req, res, function (err) {
		if (err) {
			res.send("loi");
		}
		else{
			if (req.file) {
				var image = req.file.filename;
			} else {
				var image = req.body.image;
			}
			console.log(image);
			const params = {
				title: req.body.title,
				teaser: req.body.teaser,
				description: req.body.description,
				keyword: req.body.keyword,
				alias: functions.xoadau(req.body.title),
				category_id: req.body.category,
				admin: req.session.userId,
				image: image
			}
			New.add(params,(err,rs)=>{
				if(err){
					req.flash('messages','Đã có lỗi xảy ra xin thử lại!');
					res.redirect('category');
				}else{
					req.flash('messages','Cập nhập thành công!');
					res.redirect('category');
				}
			})
		}
	})
}