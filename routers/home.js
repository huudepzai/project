const express = require('express');
var router = express.Router();
var contronler = require('../app/controllers/index.js');
router.get('/', contronler.home.index)
router.get('/aboutme', contronler.home.index)
module.exports=router;
