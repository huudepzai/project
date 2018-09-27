var huudepzai = require('../../modules/huudepzai.js');
const blog = require('../models/New.js');
const config = require('../../config.js');
const functions = require('../functions/functions.js');
const title = 'Hữu Đẹp Zai Blog - nơi cảm xúc thăng hoa, nỗi buồn được dấu kín'
exports.index = function(req,res){
	var title = title;
	blog.getList((err,rs)=>{
		res.render('home.html',{title:title,data:rs,baseUrl:config.url,cutString: functions.cutString});
	})
}
exports.aboutme = function(req,res){
	var title = huudepzai.title;
	res.render('about.html',{title:title});
}