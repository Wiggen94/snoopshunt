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
var tittelh1 = document.createElement('h1');
tittelh1.setAttribute('id', 'tittelh1');


var titteltekst = document.createTextNode("SNOOP'S HUNT");
tittelh1.appendChild(titteltekst);
game.appendChild(tittelh1);
var starth1 = document.createElement('h1');
starth1.setAttribute('id', 'starth1');

var starttekst = document.createTextNode("START");
starth1.appendChild(starttekst);
var startknapp = document.createElement('button');
startknapp.setAttribute('onclick', 'startFunc()');
startknapp.setAttribute('id', 'startknapp');



startknapp.appendChild(starth1);
game.appendChild(startknapp);

// Sørger for at alle funksjoner kjører
function startFunc() {
  game.removeChild(startknapp);
  game.removeChild(tittelh1);
  drawTimer();
  drawWeed();
  scoreBoardUpdate();
}

// Timer funksjon
function drawTimer() {

  timerH1.innerHTML = 'Time: ' + time;

  // selve timer, se psuedokode.
  var timerInterval = setInterval(function() {
    if (time > 0) {
      time--;
      timerH1.innerHTML = 'Time: ' + time;
    } else if (time == 0 && score >= 10) {
      clearInterval(timerInterval);
      var vinn = document.createElement('div');
      vinn.setAttribute('id', 'vinn');
      vinn.style.backgroundImage = 'url("img/plante.gif")';
      vinn.style.width = 900 + 'px';
      vinn.style.height = 300 + 'px';
      vinn.style.position = 'absolute';
      game.appendChild(vinn);
    } else {
    clearInterval(timerInterval);
    var tap = document.createElement('div');
    tap.setAttribute('id', 'tap');
    tap.style.backgroundImage = 'url("img/gutt.png")';
    tap.style.width = 900 + 'px';
    tap.style.height = 300 + 'px';
    tap.style.position = 'absolute';
    game.appendChild(tap);

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
// Definerer hvordan en plante skal tegnes og starter timer

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
    if (time > 0) {
      weedTimer(weed);
    } else {

    }
  };
}


var weedTimeout;
// Timerfunksjon for hver plante med tilfeldig levetid
function weedTimer(weed) {
  if (document.getElementById('snakkeboble') != null) {
    weedTimeout=setTimeout(function() {
      deleteWeed(weed, '-');
      clearTimeout(weedTimeout);
    }, Math.random() * (4000 - 1500) + 1500);
}
}


// Funksjon som kjører hver gang en plante blir trykket på, resetter timer og gir 1 poeng
function weedClick(weed, change) {
  if (document.getElementById('snakkeboble') != null && time > 0) {
    deleteWeed(weed, '-');
    clearTimeout(weedTimeout);
  } else {
  clearTimeout(weedTimeout);
  deleteWeed(weed, '+');
}
}

// Tegner plante og begynner drawGutt(); hvis if condition er riktig
function drawWeed() {
  var divText = new Weed(divId);
  divText.draw();
  if (time < 25 && (Math.random() * (2000 - 1000) + 1000) < 1200 && document.getElementById('politi') == null) {
    drawGutt();
  } else {
    if (document.getElementById('politi') != null && document.getElementById('gutt') != null && document.getElementById('quotes') != null) {



    }
  }
}

// Funksjon for å fjerne weed-diven og tegner ny weed-div
function deleteWeed(weed, change) {
  game.removeChild(weed);
  scoreBoardUpdate(change);
  divId++;
  drawWeed();
}
// Definerer hvordan en politibil skal tegnes
function Politi() {



  this.draw = function() {
    var politi = document.createElement('img');
    politi.setAttribute('id', 'politi');
    politi.setAttribute('src', 'img/politi.png');
    politi.setAttribute('draggable', 'false');
    politi.style.position = 'absolute';
    politi.style.marginTop = 497 + 'px';
    politi.style.marginLeft = 600 + 'px';
    politi.style.float = 'right';
    politi.style.display = 'inherit';
    politi.style.width = '-15%';
    game.appendChild(politi);
    var pos = 0;
    var id = setInterval(frame, 2);

    function frame() {
      if (pos == 900) {
        clearInterval(id);
        setTimeout(function() {
          game.removeChild(politi);
          game.removeChild(quotes);
          game.removeChild(gutt);

        }, 1);
      } else {
        pos++;
        politi.style.right = pos + 'px';
      }
    }
  };
}
// Definerer hvordan gutt, snakkeboble og tekst skal tegnes
function Gutt() {

  this.draw = function() {
    var gutt = document.createElement('img');

    gutt.setAttribute('id', 'gutt');
    gutt.setAttribute('src', 'img/gutt.png');
    gutt.setAttribute('draggable', 'false');
    gutt.style.position = 'absolute';
    gutt.style.marginTop = 220 + 'px';
    gutt.style.marginLeft = -200 + 'px';
    gutt.style.display = 'visible';

    game.appendChild(gutt);

  };

  }
function Snakkeboble() {
  this.draw = function() {
    var quotes = document.createElement('div');
    quotes.setAttribute('id', 'quotes');
    var quoteslist = ['img/1.png', 'img/2.png', 'img/3.png','img/4.png']; //your assumed array
    var rand = Math.floor(Math.random() * quoteslist.length);
    var img = document.createElement('img');
    img.setAttribute('id', 'snakkeboble');
    img.src = quoteslist[rand];
    quotes.appendChild(img);
    game.appendChild(quotes);
};
}

// Tegner en politibil
function drawPoliti() {
  var imgPoliti = new Politi();
  imgPoliti.draw();
}
function drawSnakkeboble() {
  var imgSnakkeboble = new Snakkeboble();
  imgSnakkeboble.draw();
}
// Tegner en gutt og kaller drawPoliti() setTimeout slik at den starter ett sekund etter gutten
function drawGutt() {
  var imgGutt = new Gutt();
  imgGutt.draw();
  setTimeout(function() {
    drawSnakkeboble();
  }, 1000);
  setTimeout(function() {
    drawPoliti();
  }, 3000);
}
