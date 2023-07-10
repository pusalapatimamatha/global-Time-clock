// TimeDisplay.js
document.addEventListener('DOMContentLoaded', startTimer);
function startTimer() {
	setInterval(displayTimeCDT, 500);
	setInterval(displayTimeEDT, 500);
	setInterval(displayTimeBST, 500);
	setInterval(displayTimeUTC, 500);
	setInterval(displayTimeIST, 500);
	setInterval(displayTimeSGP, 500);
	setInterval(displayTimeHKT, 500);
	setInterval(displayTimeJST, 500);
	setInterval(displayTimeAEST, 500);
	displayTimeCDT();
	displayTimeEDT();
	displayTimeBST();
	displayTimeUTC();
	displayTimeIST();
	displayTimeSGP();
	displayTimeHKT();
	displayTimeJST();
	displayTimeAEST();
}
function displayTimeCDT() {
	displayTime(
		moment().tz('America/Winnipeg'),
		90,
		'#digital-time-cdt',
		'#analog-time-cdt',
	);
}
function displayTimeEDT() {
	displayTime(
		moment().tz('America/New_York'),
		90,
		'#digital-time-edt',
		'#analog-time-edt',
	);
}
function displayTimeBST() {
	displayTime(
		moment().tz('Europe/London'),
		90,
		'#digital-time-bst',
		'#analog-time-bst',
	);
}
function displayTimeUTC() {
	displayTime(moment().utc(), 90, '#digital-time-utc', '#analog-time-utc');
}
function displayTimeIST() {
	displayTime(
		moment().tz('Asia/Kolkata'),
		90,
		'#digital-time-ist',
		'#analog-time-ist',
	);
}
function displayTimeSGP() {
	displayTime(
		moment().tz('Asia/Singapore'),
		90,
		'#digital-time-sgp',
		'#analog-time-sgp',
	);
}
function displayTimeHKT() {
	displayTime(
		moment().tz('Asia/Hong_Kong'),
		90,
		'#digital-time-hkt',
		'#analog-time-hkt',
	);
}
function displayTimeJST() {
	displayTime(
		moment().tz('Asia/Tokyo'),
		90,
		'#digital-time-jst',
		'#analog-time-jst',
	);
}
function displayTimeAEST() {
	displayTime(
		moment().tz('Australia/Sydney'),
		90,
		'#digital-time-aest',
		'#analog-time-aest',
	);
}
function displayTime(now, clockRadius, digitalClockDiv, analogClockCanvas) {
	var hours = now.hours();
	var minutes = now.minutes();
	var seconds = now.seconds();
	var day = now.day();
	var date = now.date();
	var month = now.month();
	var year = now.year();
	var timeString =
		getDay(day) +
		' ' +
		padZero(date) +
		'/' +
		padZero(month + 1) +
		'/' +
		String(year) +
		' ' +
		padZero(formatHour(hours)) +
		':' +
		padZero(minutes) +
		':' +
		padZero(seconds) +
		' ' +
		getTimePeriod(hours);
	document.querySelector(digitalClockDiv).innerHTML = timeString;
	// --- Analog clock ---//
	var canvas = document.querySelector(analogClockCanvas);
	var context = canvas.getContext('2d');
	var clockX = canvas.width / 2;
	var clockY = canvas.height / 2;
	Math.TAU = 2 * Math.PI;
	function drawArm(progress, armThickness, armLength, armColor) {
		var armRadians = Math.TAU * progress - Math.TAU / 4;
		var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
		var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);
		context.lineWidth = armThickness * clockRadius;
		context.strokeStyle = armColor;
		context.beginPath();
		context.moveTo(clockX, clockY);
		context.lineTo(targetX, targetY);
		context.stroke();
	}
	function drawClockIndicators() {
		function drawClockIndicator(progress, color) {
			var radians = Math.TAU * progress - Math.TAU / 4;
			var thickness = 0.04;
			var startLength = 0.8;
			var endLength = 0.95;
			if (
				progress == 0 / 12 ||
				progress == 3 / 12 ||
				progress == 6 / 12 ||
				progress == 9 / 12
			) {
				thickness = 0.1;
				startLength = 0.77;
				endLength = 1;
			}
			var sourceX = clockX + Math.cos(radians) * (startLength * clockRadius);
			var sourceY = clockY + Math.sin(radians) * (startLength * clockRadius);
			var targetX = clockX + Math.cos(radians) * (endLength * clockRadius);
			var targetY = clockY + Math.sin(radians) * (endLength * clockRadius);
			context.lineWidth = thickness * clockRadius;
			context.strokeStyle = color;
			context.beginPath();
			context.moveTo(sourceX, sourceY);
			context.lineTo(targetX, targetY);
			context.stroke();
		}
		for (var i = 0; i < 12; i++) {
			drawClockIndicator(i / 12, '#BEBEBE');
		}
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawClockIndicators();
	drawArm(hours / 12 + minutes / (60 * 12), 0.07, 0.5, '#000000');
	drawArm(minutes / 60, 0.035, 0.75, '#000000');
	drawArm(seconds / 60, 0.02, 1.0, '#FF0000');
}
function padZero(number) {
	if (number < 10) {
		return '0' + String(number);
	} else {
		return String(number);
	}
}
function formatHour(hours) {
	var hour = hours % 12;
	if (hour == 0) {
		hour = 12;
	}
	return String(hour);
}
function getTimePeriod(hours) {
	return hours < 12 ? 'AM' : 'PM';
}
function getDay(day) {
	var Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return Days[day];
}
