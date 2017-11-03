var yWeed = 450;
var weedSize = 100;

var color = ['#92d090', '#ffcf79', '#e5e4d7', '#2c6700' ];

var time = 15;
var timeWeed;
var score = 0;

var divId = 0;

var weed;

//Henter game- og timerh1-diven
var game = document.getElementById('game');
var timerH1 = document.getElementById('timerboard');
var scoreH1 = document.getElementById('scoreboard');
var plantsDiv = document.getElementById('plants');

//Sørger for at brukerne ikke kan høyre klikke på spillet
game.oncontextmenu = function () {
   return false;
};

// Sørger for at alle funksjoner kjører
window.onload = function() {
	drawTimer();
	drawWeed();
	scoreBoardUpdate();
};

// Lager og oppdaterer timeren
function drawTimer () {
	timerH1.innerHTML = 'Time: ' + time

	var timerInterval = setInterval( function () {
		if (time > 0) {
			time--;
			timerH1.innerHTML = 'Time: ' + time;
			}
		else {
			clearInterval(timerInterval)
			alert('Game over! Your score was ' + score);
			score = 0
			scoreBoardUpdate();
		}
	}, 1000)
}

// Oppdaterer scoreboard når funksjon er kalt, den vurderer parameteren om den er + eller -.
function scoreBoardUpdate (change) {
	switch (change) {
		case '+':
			score++;
			break;
		case '-':
			score--;

			break;

	}
	scoreH1.innerHTML = "Score: " + score;
}

// Object creating
function Weed (y, divId) {

	this.y = yWeed;
	this.id = divId


	this.draw = function () { 
		  var weed = document.createElement('div');
	  weed.setAttribute('id', 'weed' + this.id);
	  weed.setAttribute('onclick', 'weedClick(' + weed.id + ');')
	  weed.style.backgroundImage = 'url("img/plante.jpg")';
	  weed.style.width = weedSize + 'px';
	  weed.style.height = weedSize + 'px';
	  weed.style.position = 'absolute';
	  weed.style.marginTop = this.y + 'px';
	  weed.style.marginLeft = Math.random()*600 + 'px';
	  game.appendChild(weed);
	  weedTimer(weed);



	}

	
}

function weedClick(weed) {
		game.removeChild(weed);
		scoreBoardUpdate('+');
		drawWeed();
}



function weedTimer(weed) {
	// debugger;
	setTimeout(function() {
		game.removeChild(weed);
		scoreBoardUpdate('-');
		drawWeed();
	}, Math.floor(Math.random()*(2000-1000) + 1000));

	
}



function drawWeed () {

	var weed = new Weed(yWeed, divId)
	weed.draw();
}



