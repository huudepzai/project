//test fuke
app.get('/file',function(req,res){
	var cars = [
	{
		'name':'BMW',
		'price':'500k$'
	},
	{
		'name':'MESCERDES',
		'price':'500k$'
	},
	{
		'name':'AUDI',
		'price':'500k$'
	},

	]
	file.createFile('temp.txt');
	file.writeFile('temp.txt',JSON.stringify(cars),(err,rs)=>{
		if(err){
			console.log(`lỗi ${err}`);
			res.send('Lỗi');
		}else{
			console.log(`Done ${rs}`);
			res.send('Sucess!');
		}
	});
})