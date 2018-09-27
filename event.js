const EventEmitter = require('events');
class cusTomer extends EventEmitter {
	constructor(name,gender){
		super();
		this.name = name;
		this.gender = gender;
	}
}
const mrHuu = new cusTomer('Huu','male');
mrHuu.on('event', (data) => {
  console.log('an event occurred!');
  for (let index in data ){
  	console.log(`${mrHuu.name} view ${data[index]}`);
  }
});
mrHuu.emit('event',['BMW','Audi']);