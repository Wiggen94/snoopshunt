var time = 30;
var score = 0;
var divId = 0;

//Henter game-, timerh1-, og score-elementer
var game = document.getElementById('game');
var timerH1 = document.getElementById('timerboard');
var scoreH1 = document.getElementById('scoreboard');


//Sørger for at brukerne ikke kan høyre klikke på spillet
game.oncontextmenu = function() {
  return false;
};

// Sørger for at alle funksjoner kjører
window.onload = function() {
  //starter timer funksjonen
  drawTimer();
  //tegner første weedplanten
  drawWeed();
  //tegner scoreboarden
  scoreBoardUpdate();
};

// Timer funksjon
function drawTimer() {

  timerH1.innerHTML = 'Time: ' + time;

  // selve timer, se psuedokode.
  var timerInterval = setInterval(function() {
    if (time > 0) {
      time--;
      timerH1.innerHTML = 'Time: ' + time;
    } else {
      clearInterval(timerInterval);
      alert('Game over! Your score was ' + score);
      score = 0;
      scoreBoardUpdate();
    }
  }, 1000);
}

// Oppdaterer scoreboard når funksjon er kalt, den vurderer parameteren om den er + eller -.
function scoreBoardUpdate(change) {
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

function Weed(divId) {
  this.id = divId;
  this.draw = function() {
    var weed = document.createElement('div');
    weed.setAttribute('id', 'weed' + this.id++);
    weed.setAttribute('onclick', 'weedClick(' + weed.id + ');');
    weed.style.backgroundImage = 'url("img/plante.gif?' + weed.id + '")';
    weed.style.width = 100 + 'px';
    weed.style.height = 100 + 'px';
    weed.style.position = 'absolute';
    weed.style.marginTop = 400 + 'px';
    weed.style.marginLeft = Math.random() * 600 + 'px';

    game.appendChild(weed);
    weedTimer(weed);
  };
}


var weedTimeout;

function weedTimer(weed) {
  weedTimeout = setTimeout(function() {
    deleteWeed(weed, '-');
  }, Math.random() * (4000 - 1500) + 1500);

}


function weedClick(weed) {
  clearTimeout(weedTimeout);
  deleteWeed(weed, '+');
}


function drawWeed() {
  var divText = new Weed(divId);
  divText.draw();
  if (document.getElementById('politi') != null) {
    game.removeChild(document.getElementById('gutt'));
    game.removeChild(document.getElementById('snakkeboble'));
    document.getElementById('quotes').innerHTML = '';
  } else {
    if (time < 25 && (Math.random() * (2000 - 1000) + 1000) < 1200 && document.getElementById('politi') == null) {
      drawGutt();
    }
  }
}


function deleteWeed(weed, change) {
  game.removeChild(weed);
  scoreBoardUpdate(change);
  divId++;
  drawWeed();
}

function Politi(divId) {



  this.draw = function() {
    var politi = document.createElement('img');
    politi.setAttribute('id', 'politi');
    politi.setAttribute('src', 'img/politi.png');
    politi.setAttribute('draggable', 'false');
    politi.style.position = 'absolute';
    politi.style.marginTop = 497 + 'px';
    politi.style.marginLeft = 600 + 'px';
    politi.style.float = 'right';
    politi.style.display = 'visible';
    politi.style.width = '-15%';
    game.appendChild(politi);
    var pos = 0;
    var id = setInterval(frame, 2);

    function frame() {
      if (pos == 900) {
        clearInterval(id);
        setTimeout(function(){
        game.removeChild(politi);}, 1000);
      } else {
        pos++;
        politi.style.right = pos + 'px';
      }
    }
  };
}

function Gutt() {

  this.draw = function() {
    var gutt = document.createElement('img');

    gutt.setAttribute('id', 'gutt');
    gutt.setAttribute('src', 'img/gutt.png');
    gutt.setAttribute('draggable', 'false');
    gutt.style.position = 'absolute';
    gutt.style.marginTop = 220 + 'px';
    gutt.style.marginLeft = -200 + 'px';
    gutt.style.width = 130 + 'px';
    gutt.style.display = 'visible';

    game.appendChild(gutt);

    var snakkeboble = document.createElement('img');
    snakkeboble.setAttribute('id', 'snakkeboble');
    snakkeboble.setAttribute('src', 'img/snakkeboble.png');
    snakkeboble.setAttribute('draggable', 'false');
    snakkeboble.style.position = 'absolute';
    snakkeboble.style.marginTop = 100 + 'px';
    snakkeboble.style.marginLeft = -180 + 'px';
    snakkeboble.style.width = 200 + 'px';
    snakkeboble.style.float = 'left';
    snakkeboble.style.display = 'inline-block';

    game.appendChild(snakkeboble);



    var quotes = document.createElement('div');
    quotes.setAttribute('id', 'quotes');
    var quoteslist = ["MAN.. HERE COMES THE POPO TO TELL US WHAT TO DO AGAIN", "IT'S THE POPO IN SLOW MO!", "FIVE-O! FIVE-O! FIVE-O! FIVE-O!", "PUT THAT BLUNT OUT, FIVE-O, FIVE-O!"];
    var quote = document.getElementById('quotes');
    quote.innerHTML = quoteslist[Math.floor(Math.random() * quoteslist.length)];
    game.appendChild(quote);
  };
}

function drawPoliti() {
  var imgPoliti = new Politi();
  imgPoliti.draw();
}

function drawGutt() {
  var imgGutt = new Gutt();
  imgGutt.draw();
setTimeout(function(){
drawPoliti();}, 1000);
}
