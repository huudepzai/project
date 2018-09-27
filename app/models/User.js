var bcrypt = require('bcrypt');
var User = db.define('user', {
  id : {
    type: Sequelize.BIGINT,
    primaryKey : true,
    autoIncrement : true
  },
  username: {
    type: Sequelize.STRING
  },
  fullname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  }
}
, {
  freezeTableName : true,
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
}
)
User.sync();
exports.add = function(username,fullname,password,email,profileImage,callback) {  
  let err,result;
  User.find({
    where : {
      username : username
    }
  }).then(function (result) {
    if(result) {
      err = 'Tên đăng nhập đã tồn tại vui lòng chọn tên khác!';
      return callback(err,result);
    }
    else{
      User.find({
        where : {
          email : email
        }
      }).then(function (result1) {
        if(result1) {
          err = 'Email đã tồn tại vui lòng kiếm tra lại!';
          return callback(err,result);
        }else{

          User.create({
            username: username,
            fullname: fullname,
            email: email,
            password:password,
            avatar: profileImage,
          }).then(function (result) {
           return callback(err,result);
         }).catch(function (err){
           console.log(err);
           err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
           return callback(err,result);
         })
       }

     }).catch(function (err){
      console.log(err);
      err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
      return callback(err,result);
    })
   }
 }).catch(function (err) {
  err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
  return callback(err,result);

})

}
exports.find = function(username,callback) {  
  let err,result;
  User.find({
    where : {
      username : username
    }
  }).then(function (result) {
    return callback(null,result);
  }).catch(function (err) {
    err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
    return callback(err,result);
  })
}

exports.findId = function(id,callback) {  
  let err,result;
  User.find({
    where : {
      id : id
    }
  }).then(function (result) {
    return callback(null,result);
  }).catch(function (err) {
    err = 'Có lỗi trong quá trình đăng ký hãy thử lại!';
    return callback(err,result);
  })
}
