// That's all you need to do.

/************************************************************************/
// Initial digit position for each number graphic
// 9-0

var initialPos = [-5562, -4944, -4326, -3708, -3090, -2472, -1854, -1236, -618, 0];
// 5-0 (first minute and second digit)
var initialMidPos = [-3090, -2472, -1854, -1236, -618, 0];
// 2-0 (first hour digit)
var initialSmallPos = [-1236, -618, 0];
var classNames = ['Wochen', 'Tage', 'Stunden', 'Minuten', 'sekunden'];
var idNames = ['w', 'd', 'h', 'm', 's'];
var animationFrames = 5;
var frameShift = 103;
// Starting numbers
var now = new Date().getTime();
var end;
var theDiff;
var theDiffString;
// Increment (count one second at a time)
var increment = 1000;
// Pace of counting in milliseconds (refresh digits every second)
var pace = 1000;

function counterInit(){
	// If no number in URL (?date=1/1/11), then use default one
	target = (window.location.search == "") ? target : window.location.search.substring(6);
	end = Date.parse(target);
	// Fix if date is in past
	if (end < now){
		target = 'December 25, 2020';
		end = Date.parse(target);
	}
	theDiff = end-now;
	theDiffString = getTimeString(theDiff);
}

// Function that controls counting
function doCount(){
	var x = getTimeString(theDiff);
	theDiff -= increment;
	var y = getTimeString(theDiff);
	// For debugging
	//console.log(y);
	digitCheck(x,y);
}

// This checks the old value vs. new value, to determine how many digits need to be animated.
function digitCheck(x,y){
	var a = x.split(':');
	var b = y.split(':');
	for (var i = 0, c = a.length; i < c; i++){
		if (a[i].length < 2) a[i] = '0' + a[i];
		if (b[i].length < 2) b[i] = '0' + b[i];
		var countA = a[i].toString().length;
		var countB = b[i].toString().length;
		if (countB < countA) removeDigit(i, countB);
		for (var j = 0; j < countB; j++){
			if (b[i].charAt(j) != a[i].charAt(j)){
				var which = idNames[i] + j;
				animateDigit(which, a[i].charAt(j), b[i].charAt(j));
			//console.log(which + ' ' + a[i].charAt(j) + ' ' + b[i].charAt(j));
			}
		}
	}
}

// Function to break the time into day:hour:minute:second
function getTimeString(d){
	var diff = d;
	var weeks = Math.floor(diff / 604800000);
	diff -= weeks * 604800000;
	var days = Math.floor(diff / 86400000);
	diff -= days * 86400000;
	var hours = Math.floor(diff / 3600000);
	diff -= hours * 3600000;
	var minutes = Math.floor(diff / 60000) + 1;
	diff -= minutes * 60000;
	var seconds = Math.floor(diff / 1000);
	//return days + ':' + hours + ':' + minutes + ':' + seconds;
    return weeks + ':' + days + ':' + hours + ':' + minutes;
}


// Looks in correct array to get the digit's position
function getPos(id, digit){
	if (id == 's0' || id == 'm0'){
		return initialMidPos[digit];
	}
	else if (id == 'h0'){
		return initialSmallPos[digit];
	}
	else{
		return initialPos[digit];
	}
}

// Animation function
function animateDigit(which, oldDigit, newDigit){
	var speed = 80;
	var pos = getPos(which, oldDigit);
	var newPos = getPos(which, newDigit);
	// Each animation is 5 frames long, and 103px down the background image.
	// We delay each frame according to the speed above.
	for (var k = 0; k < animationFrames; k++){
		pos -= frameShift;
		if (k == (animationFrames - 1)){
			(jQuery)("#" + which).delay(speed).animate({
				'background-position': '0 ' + pos + 'px'
			}, 0, function(){
				// At end of animation, shift position to new digit.
				(jQuery)("#" + which).css({
					'background-position': '0 ' + newPos + 'px'
				}, 0);
			});
		}
		else{
			(jQuery)("#" + which).delay(speed).animate({
				'background-position': '0 ' + pos + 'px'
			}, 0);
		}
	}
}

// Remove digit
function removeDigit(i,count){
	(jQuery)("li#" + idNames[i] + count).remove();
}

// Sets the correct digits on load
function initialDigitCheck(initial){

	// Creates the html
	var a = initial.split(':');
	for (var i = 0, c = a.length; i < c; i++){
		if (a[i].length < 2)
			a[i] = '0' + a[i];
		var count = a[i].toString().length;
		var html = '<div class="set"><ul class="' + classNames[i] + '">';
		var bit = count;
		for (var j = 0; j < count; j++){
			bit--;
			html += '<li class="digit" id="' + idNames[i] + j + '"></li>';
			if (bit != 0 && bit != (count) && bit % 3 == 0) html += '<li class="comma"></li>';
		}
        // html += '</ul><h2 class="counter">' + classNames[i].toUpperCase() + '</h2>';
		html += '</ul><h2 class="counter">' + classNames[i] + '</h2>';
		// If you don't like the ':' separator, remove the following line
		//if (i != 3){
			//html += '</div><div class="separator">:</div>';
		//}
		(jQuery)("#countdowncontainer").append(html);
	}

	var counterwidth=2; // just to make sure firefox to do not drive us crazy with bad css interpretation.
	(jQuery)("#countdowncontainer").children().each(function(index, domEle) {
		counterwidth += $(domEle).clientWidth;
	});

	(jQuery)("#countdowncontainer").width(counterwidth);

	// Sets digits to the right number
	for (var n = 0, cn = a.length; n < cn; n++){
		count = a[n].toString().length;
		for (var m = 0; m < count; m++){
			var thisID = idNames[n] + m;
			var thisPos = getPos(thisID, a[n].charAt(m));
			(jQuery)("#" + idNames[n] + m).css({
				'background-position': '0 ' + thisPos + 'px'
			});
		}
	}
// Set title
//$("h1").text('COUNTDOWN TO ' + target.toUpperCase());
}