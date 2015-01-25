var clav = document.getElementById('clav');
clav.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
});

var hat = document.getElementById('hat');
hat.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
});


var hit = document.getElementById('hit');
hat.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
});

// hat.volume = 0.6;
// hit.volume = 0.6;
// clav.volume = 0.6;

// hat.play();

$('.percussion-all').on('click', function() {
	hat.play();
	clav.play();
	hit.play();
	$('.master').focus();
});

var keyboard = {
	'A': A
  , 'B': B
  , 'C': C
  , 'D': D
  , 'E': E
  , 'F': F
  , 'G': G
  , 'A2': A2
};

$('.percussion .clav').on('click', function() {
	$(this).toggleClass('active');

	if ($(this).hasClass('active')) {
		clav.play();
	}
	else {
		clav.pause();
	}
	$('.master').focus();
})

$('.percussion .hat').on('click', function() {
	$(this).toggleClass('active');

	if ($(this).hasClass('active')) {
		hat.play();
	}
	else {
		hat.pause();
	}
	$('.master').focus();
})

var stopSounds = function() {
	glitcher.clear();
	for (var i = 0; i < notes.length; i++) {
		notes[i].stop();
	}
	$('.keyboard button').removeClass('active');

	hat.pause();
	clav.pause();
};

$('.stop').on('click', function() {
	stopSounds();
	$('.master').focus();
});

$('.random-range').on('input', function() {
	var val = $(this).val();
	glitcher.setRandomRange(val / 100);
	$('.random-range-value').text(val / 100);
});

$('.frequency').on('input', function() {
	var val = $(this).val();
	glitcher.setTimer(val);
	$('.frequency-value').text(val);
});

$('.keyboard button').on('click', function() {
	var $button = $(this);
	$button.toggleClass('active');

	var note = keyboard[$button.text()];

	if ($button.hasClass('active')) {				
		note.play();
	}
	else {
		note.stop();
	}
	$('.master').focus();
});

$('.master').on('keydown', function(e) {
	var k = e.keyCode;

	if (k === 38) {
		console.log("UP");

		$(".A").click();
	}
	else if (k === 40) {
		console.log("DOWN");

		$(".C").click();
	}
	else if (k === 39) {
		console.log("RIGHT");
		$(".E").click();
	}
	else if (k === 37) {
		console.log("LEFT");
		$(".B").click();
	}
	else if (k === 32) {
		console.log("SPACE");
		$(".D").click();
	}
});


// A.play();
// C.play();
// G.play();

glitcher.setTimer(100);


$('.master').focus();

// glitcher.setRandomRange(0.30);
// glitcher.setRandomRange(0.50);


