const shootingsData = require('./data');
var five = require("johnny-five");
var board;
var lcd;

board = new five.Board();

board.on("ready", function() {

	let incrementer = 0;

	let secondsInDay = 60 * 60 * 24;

	let averageLength = secondsInDay/shootingsData.length;

	console.log(averageLength);

	lcd = new five.LCD({
		// LCD pin name  RS  EN  DB4 DB5 DB6 DB7
		// Arduino pin # 7    8   9   10  11  12
		pins: [7, 8, 9, 10, 11, 12],
		backlight: 6,
		rows: 2,
		cols: 20
	});

	writeName(incrementer);
	incrementer = (incrementer + 1) % shootingsData.length;

	setInterval(() => {
		writeName(incrementer);
		incrementer = (incrementer + 1) % shootingsData.length;
	}, averageLength * 1000);

	this.repl.inject({
		lcd: lcd
	});
});

const writeName = (incrementer) => {
	let name = shootingsData[incrementer];
	let nameArray = name.split(' ');
	let firstName = nameArray.shift();
	let lastName = nameArray.join(' ');
	lcd.clear();
	lcd.cursor(0, 0);
	lcd.print(firstName);
	lcd.cursor(1, 0);
	lcd.print(lastName);
}