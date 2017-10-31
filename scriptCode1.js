var yWeed = 475;
var weedSize = 100;

var color = ['#92d090', '#ffcf79', '#e5e4d7', '#2c6700' ]

var time = 15;
var score = 0;

var divId = 0;

//Henter game- og timerh1-diven
var game = document.getElementById('game');
var timerH1 = document.getElementById('timerboard')

//Sørger for at brukerne ikke kan høyre klikke på spillet
game.addEventListener('contextmenu', event => event.preventDefault());

// Sørger for at alle funksjoner kjører
window.onload = function() {
	drawTimer();
	drawWeed();

}

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
		}
	}, 1000)
}


// Lager planter og sørge at man kan trykk på de
function drawWeed () {
	//Lager scoreboard plassen og styler den
	var scoreTextPlace = document.createElement('h1');
	scoreTextPlace.setAttribute('id', 'scoreboard');
	var scoreText = document.createTextNode('Score: ' + score);
	scoreTextPlace.appendChild(scoreText);
	game.appendChild(scoreTextPlace);


	// Inkrementerer divID, sånn at alle div får en unik ID
	divId++;

	// Lager en div og setter attributter
	var weed = document.createElement('div');
	weed.setAttribute('id', 'weed' + divId);
	weed.style.backgroundColor = color[Math.floor(Math.random()*(color.length))];
	weed.style.width = weedSize + 'px';
	weed.style.height = weedSize + 'px';
	weed.style.marginTop = yWeed + 'px';
	weed.style.marginLeft = Math.floor((Math.random() * 800) + 1) + 'px';

	// Legger div-en i 'game' div-en
	game.appendChild(weed);


	// Onclick
	weed.onclick = function () {
		game.removeChild(scoreTextPlace);
		game.removeChild(weed);
		score++;
		drawWeed();

	}
}

