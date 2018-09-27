var New = db.define('news', {
  id : {
    type: Sequelize.BIGINT,
    primaryKey : true,
    autoIncrement : true
  },
  title: {
    type: Sequelize.STRING
  },
  alias: {
    type: Sequelize.STRING
  },
  category_id: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  keyword: {
    type: Sequelize.STRING
  },
  teaser: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.BIGINT
  },
  series_id: {
    type: Sequelize.BIGINT
  }
}
, {
  freezeTableName : true,
}
)
New.sync();
exports.add = function(params,callback) {  
  let err,result,slug;
  //kiem tra su ton tai cua slug neu ton tai thi them doi so 1,2,3...
  New.count({ where: {'alias': params.alias} }).then(c  =>{
   if(c>0) {
    c = c+1;
    alias = params.alias+'-'+c;
  }else{
    alias = params.alias;
  }
  New.create({
    title: params.title,
    alias: alias,
    category_id: params.category_id,
    keyword: params.keyword,
    teaser: params.teaser,
    type: 'post',
    author: params.admin,
    image: params.image,
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
  New.findAll({
    order:[['id','DESC']]
  }).then(function (result) {
   return callback(err,result);
 }).catch(function (err){
   err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
   return callback(err,result);
 })
}
