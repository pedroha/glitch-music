// Start off by initializing a new context.
context = new (window.AudioContext || window.webkitAudioContext)();

if (!context.createGain)
  context.createGain = context.createGainNode;
if (!context.createDelay)
  context.createDelay = context.createDelayNode;
if (!context.createScriptProcessor)
  context.createScriptProcessor = context.createJavaScriptNode;

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
  window.setTimeout(callback, 1000 / 60);
};
})();


var Note = function(freq) {
	this.originalFreq = freq;
	this.freq = freq || 440;
	this.type = 0; // SINE

	var gainNode = context.createGain();

	var bass = context.createBiquadFilter();

	bass.type = 3;
	bass.frequency.value = freq;
	bass.Q.value = 0.5;
	bass.gain.value = 0.90;

	var self = this;

	this.play = function() {
		if (this.oscillator) this.stop();				
		this.oscillator = context.createOscillator();
		this.oscillator.detune.value = 100;
		this.oscillator.connect(bass);

		bass.connect(gainNode); // Not working?

    	gainNode.connect(context.destination);
    	this.oscillator.frequency.value = this.freq;
		this.oscillator.noteOn(0);
	};

	this.setVolume = function(volume) {
		gainNode.gain.value = volume;
	};

	this.stop = function() {
		if (this.oscillator) {
			this.oscillator.disconnect(0);
			this.oscillator = null;					
		}
	};

	this.changeFreq = function(freq) {
		if (this.oscillator) {
			bass.frequency.value = freq;
	    	this.oscillator.frequency.value = freq;
		}
	}
};

var A = new Note(440);
var B = new Note(513.3);
var C = new Note(586.6);
var D = new Note(623.3);
var E = new Note(696.6);
var F = new Note(770);
var G = new Note(843.3);
var A2 = new Note(880);

var Glitcher = function(randomRangePercentage) {
	var timer;
	var callback;
	var self = this;

	// this.setPercentage = function()

	this.setCallback = function(callback) {
		this.callback = callback;
	}

	this.setTimer = function(interval) {
		if (timer) {
			self.clear();
		}
		timer = setInterval(function() {
			self.callback();
		}, interval);
	};

	this.clear = function() {
		clearInterval(timer);
		timer = null;
	}

	this.getNextValue = function(freq) {
		var range = (freq * randomRangePercentage);
		var sign = (Math.random() > 0.5) ? 1 : -1;
		return freq  + Math.random() * range * sign;
	};

	this.setRandomRange = function(range) {
		randomRangePercentage = range;
	};
};

var notes = [A, B, C, D, E, F, G, A2];

var glitcher = new Glitcher(0.10);

glitcher.setCallback(function() {
	console.log("Let's glitch !!!");

	for (var i = 0; i <  notes.length; i++) {
		var freq = notes[i].originalFreq;
		var nextFreq = glitcher.getNextValue(freq);
		notes[i].changeFreq(nextFreq);
	}
});
