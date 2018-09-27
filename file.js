const fs = require('fs');
module.exports ={
	createFile:(filename)=>{
		const fn = fs.openSync(filename,'w')
	},
	writeFile:(filename,string,callback)=>{
		fs.writeFile(filename,string,'utf-8',(err,data)=>{
		if(err){
			return callback(err,null);
		}
		return callback(null,data);
	})
	}
}