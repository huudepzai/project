const express = require('express');
var router = express.Router();
var config = require('../config.js');
var adminUrl = config.urlAdmin;
var contronler = require('../app/controllers/index.js');
var Member = require('../app/models/User.js');
router.get('/index',checkAuthenticated, contronler.admin.index);
router.get('/register', contronler.admin.register);
router.get('/login', contronler.admin.login);
router.post('/login', contronler.admin.postlogin);
router.get('/logout', function (req,res) {
	req.logout();
	req.flash('success_msg','You logged out');
	res.redirect(adminUrl+'login');
})
router.get('/category', contronler.admin.addCategory);
router.post('/category', contronler.admin.updateCategory);

router.get('/addnew', checkAuthenticated, contronler.admin.addNew);
router.post('/addnew', checkAuthenticated, contronler.admin.updateNew);
// hàm kiểm tra xem có tồn tại user ko
function checkAuthenticated(req,res,next){
	if(!req.session.userId){
		res.redirect(adminUrl+'login');
	} else {
		Member.findId(req.session.userId,(err,rs)=>{
			if(!rs){
				res.redirect(adminUrl+'login');
			}else{
				next();
			}
		})
	}
}
module.exports=router;
