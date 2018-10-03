var Configweb = db.define('config', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  keyword: {
    type: Sequelize.STRING
  },
  logo: {
    type: Sequelize.STRING
  }
}
, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
  freezeTableName : true,
}
)
Configweb.sync();
exports.update = function(params,callback) {  
  let err,result;
  Configweb.count({}).then(c  =>{
    if(c>0){
      Configweb.update({
        title: params.title,
        logo: params.logo,
        keyword: params.keyword,
        description: params.description
      },{}).then(function (result) {
       return callback(err,result);
     }).catch(function (err){
       err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
       return callback(err,result);
     })
   }else{
    Configweb.create({
      title: params.title,
      logo: params.logo,
      keyword: params.keyword,
      description: params.description
    }).then(function (result) {
     return callback(err,result);
   }).catch(function (err){
     err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
     return callback(err,result);
   })
 }
})
}
