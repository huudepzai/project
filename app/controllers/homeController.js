var huudepzai = require('../../modules/huudepzai.js');
const blog = require('../models/New.js')
const title = 'Hữu Đẹp Zai Blog - nơi cảm xúc thăng hoa, nỗi buồn được dấu kín'
exports.index = function(req,res){
	var title = title;
	blog.getList((err,rs)=>{
		res.render('home.html',{title:title,data:rs});
	})
}
exports.aboutme = function(req,res){
	var title = huudepzai.title;
	res.render('about.html',{title:title});
}