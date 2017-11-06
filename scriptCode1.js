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
tittelh1.setAttribute('class', 'header1')


var titteltekst = document.createTextNode("SNOOP'S HUNT");
tittelh1.appendChild(titteltekst);
game.appendChild(tittelh1);
var starth1 = document.createElement('h1');
starth1.setAttribute('id', 'starth1');
starth1.setAttribute('class', 'header1');

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
    } 
    else {
      // Sørger for at gutten, snakkeboble og politi blir fjernet.
      if(document.getElementById('weed'+ divId) != null ) {
        game.removeChild(document.getElementById('weed'+ divId))
      }
      else if (document.getElementById('gutt') != null) {
        game.removeChild(gutt);
        game.removeChild(politi);
        game.removeChild(quoteslists);
      }
      // fjerner weeden, timer og scoren når spillet er ferdig.
      
      clearInterval(timerInterval);
      timerH1.style.display = 'none';
      scoreH1.style.display = 'none';

      if(score >= 10) { // Lager vinn tekst og skriver den ut til game div-en
        var vinn = document.createElement('div');
        vinn.setAttribute('id', 'vinn');
        
        var vinnTekst = document.createTextNode('Du vant! Scoren din ble ' + score);

        var vinnh1 = document.createElement('h1');
        vinnh1.setAttribute('id', 'vinnh1');
        vinnh1.setAttribute('class', 'header1');

        vinnh1.appendChild(vinnTekst);
        vinn.appendChild(vinnh1);

        game.appendChild(vinn);
      }
      else { // Lager tap tekst og skriver den ut til game div-en
        var tap = document.createElement('div');
        tap.setAttribute('id', 'tap');
        
        var tapTekst = document.createTextNode('Du tapte! Scoren din ble ' + score + '. Prøv igjen.');

        var taph1 = document.createElement('h1');
        taph1.setAttribute('id', 'taph1');
        taph1.setAttribute('class', 'header1');

        taph1.appendChild(tapTekst);
        tap.appendChild(taph1);

        game.appendChild(tap);
      } //Avslutter score sjekk if-setningen
    } // Avslutter timer if-setningen
  }, 1000); // Avslutter timerInterval
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
    weed.setAttribute('class', 'weed');
    weed.setAttribute('onclick', 'weedClick(' + weed.id + ');');
    weed.style.backgroundImage = 'url("img/plante.gif?' + weed.id + '")';
    weed.style.marginLeft = Math.random() * 600 + 'px';

    game.appendChild(weed);
    if (time > 0) {
      weedTimer(weed);
    }
  };
}


var weedTimeout
// Timerfunksjon for hver plante med tilfeldig levetid
function weedTimer(weed) {
  weedTimeout=setTimeout(function() {
    if (document.getElementById('gutt') != null ) {
      clearTimeout(weedTimeout)
    } 
    else {
      clearTimeout(weedTimeout);
      deleteWeed(weed, '-');
    }
  }, Math.random() * (4000 - 1500) + 1500);
 
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
  var weed = new Weed(divId);
  weed.draw();
  if (time < 25 && (Math.random() * (2000 - 1000) + 1000) < 1200 && document.getElementById('gutt') == null) {
    drawGutt();
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
          weedTimer(document.getElementById('weed'+divId))
        }, 1);
      } else {
        pos += 5;
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
    game.appendChild(gutt);

  };

  }
function Snakkeboble() {
  this.draw = function() {
    var quotes = document.createElement('div');
    quotes.setAttribute('id', 'quotes');
    var quoteslist = ['img/1.png', 'img/2.png', 'img/3.png','img/4.png']; //your assumed array
 
    var img = document.createElement('img');
    img.setAttribute('id', 'snakkeboble');
    img.src = quoteslist[Math.floor(Math.random() * quoteslist.length)];
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
