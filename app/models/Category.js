var Category = db.define('category', {
  id : {
    type: Sequelize.BIGINT,
    primaryKey : true,
    autoIncrement : true
  },
  name: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  },
  parent_id: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  keyword: {
    type: Sequelize.STRING
  }
}
, {
  freezeTableName : true,
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
}
)
Category.sync();
exports.add = function(params,callback) {  
  let err,result,slug;
  //kiem tra su ton tai cua slug neu ton tai thi them doi so 1,2,3...
  Category.count({ where: {'slug': params.slug} }).then(c  =>{
   if(c>0) {
    c = c+1;
    slug = params.slug+'-'+c;
  }else{
    slug = params.slug;
  }
  Category.create({
    name: params.name,
    slug: slug,
    parent_id: params.parent_id,
    keyword:params.keyword,
    description: params.description
  }).then(function (result) {
   return callback(err,result);
 }).catch(function (err){
   err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
   return callback(err,result);
 })
})
}

exports.getList = function(callback) {  
  let err,result;
  Category.findAll({
    order:[['id','ASC']]
  }).then(function (result) {
   return callback(err,result);
 }).catch(function (err){
   err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
   return callback(err,result);
 })
}
