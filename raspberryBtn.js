/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 20-03-2018.
 */
const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const pushButton = new Gpio(3, 'in', 'falling'); //use GPIO pin 17 as input, and 'both' button press$const lodash = require('lodash')
const hrt = require('human-readable-time');

let waiting = false
let timer = null
const connected = false

//---------------------------------------------
 const serverIp = "http://192.168.0.190:3000"
// -------------------------------------------


const primusOpts = {
	reconnect: {
		max: 2000 // Number: The max delay before we try to reconnect.
		, min: 500 // Number: The minimum delay before we try reconnect.
		, retries: 1000 // Number: How many times we should try to reconnect.
  }
}


var Primus = require('primus') // Primus library from npm install primus
	, Socket = Primus.createSocket({ parser: 'JSON' })
	, client = new Socket( serverIp  , primusOpts );


client.on('connection', function (sp){
	console.log (" btnServer.js > yes = " );
})

client.on('open', () =>{
	console.log(" ##%%%%%%### PrimusFactory.js > SOCKET OPEN  ");
});

client.on('reconnect', function (opts) {
  console.log('Reconnection attempt started = ', opts.attempt );
});





function trigger(){
	const d = new Date()
	if(client ){
		client.write({ok:true})
	}

	console.log("triggered: ", hrt(d))
}





pushButton.watch( (err, value) => {
	if (err) { //if an error
		console.error('There was an error', err); //output error message to console
		return;
	}

	console.log(value)

	if(!timer){
		console.log("clicke")
		startTimer()
		trigger()
	}
});


function startTimer (){
	timer = setTimeout(clearTimer, 2000)
}

function clearTimer(){
	console.log("")
	console.log("cleared ------ ")
	console.log(" ")
	timer = null
}


function unexportOnClose() {
	//LED.writeSync(0); // Turn LED off
	//LED.unexport(); //
	pushButton.unexport();
};


process.on('SIGINT', unexportOnClose);


console.log("---------------------------")
console.log("CONNECTING TO SERVER ")
console.log("")
