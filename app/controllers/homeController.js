var huudepzai = require('../../modules/huudepzai.js');
const blog = require('../models/New.js');
const category = require('../models/Category.js');
const config = require('../../config.js');
const functions = require('../functions/functions.js');
const title = 'Hữu Đẹp Zai Blog - nơi cảm xúc thăng hoa, nỗi buồn được giấu kín';
const newpost = [];
exports.index = function(req,res){
	blog.getList((err,rs)=>{
		blog.geNewList((err2,rs2)=>{
			res.render('home.html',{title:title,data:rs,baseUrl:config.url,cutString: functions.cutString,newpost:rs2});
		})
	})
}
exports.aboutme = function(req,res){
	res.render('about.html',{title:title,newPost:[]});
}
exports.category = function(req,res){
	category.getCat(req.params.slug,(err,rs)=>{
		if( !rs ){
			res.render('404.html');
			return;
		}
		blog.getListFromCat(rs.id,(err2,list)=>{
			res.render('category.html',{title:rs.name,data:list,baseUrl:config.url,cutString: functions.cutString,newpost:newpost});
		})
	})
}
exports.detail = function(req,res){
	blog.getDetail(req.params.slug,(err,data)=>{
		if(!data){
			res.render('404.html');
			return;
		}else{
			res.render('detail.html',{title:data.title,data:data,baseUrl:config.url,cutString: functions.cutString,newpost:[]});
		}
	})
}