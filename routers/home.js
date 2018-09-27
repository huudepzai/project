const express = require('express');
var router = express.Router();
var contronler = require('../app/controllers/index.js');
router.get('/', contronler.home.index)
router.get('/aboutme', contronler.home.aboutme)
router.get('/:slug([A-Za-z0-9-]{3,})', contronler.home.category)
router.get('/:slug([A-Za-z0-9-]{3,}).html', contronler.home.detail)
module.exports=router;
