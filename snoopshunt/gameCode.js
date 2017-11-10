// Globale variabler som brukes oer hele koden
var time = 30;
var score = 0;
var divId = 0;

// lyder for pluss og minus poeng
var is_safari = (navigator.userAgent.toString().toLowerCase().indexOf("safari") != -1) && (navigator.userAgent.toString().toLowerCase().indexOf("chrome") == -1);

var minusLyd = new Audio('snoopshunt/minuspoeng.mp3');
var plussLyd = new Audio('snoopshunt/plusspoeng.mp3');

// Bakgrunnsmusikk for spillet
var musikk = new Audio('snoopshunt/music.mp3');
musikk.volume = 0.5;
musikk.currentTime = 2;
//Lager restartknapp
var restarth1 = document.createElement('h1');
restarth1.setAttribute('id', 'restarth1');
restarth1.setAttribute('class', 'header1');
var restarttekst = document.createTextNode("START PÅ NYTT");
restarth1.appendChild(restarttekst);
var restartknapp = document.createElement('button');
restartknapp.setAttribute('onclick', 'startFunc()');
restartknapp.setAttribute('id', 'restartknapp');
restartknapp.setAttribute('class', 'knapp');
restartknapp.appendChild(restarth1);

//Henter game-, timerh1-, og score-elementer
var game = document.getElementById('game');
var timerH1 = document.getElementById('timerboard');
var scoreH1 = document.getElementById('scoreboard');


//Sørger for at brukerne ikke kan høyre klikke på spillet
game.oncontextmenu = function() {
  return false;
};

// Lager h1-en for tittelen "Snoop's Hunt"
var tittelh1 = document.createElement('h1');
tittelh1.setAttribute('id', 'tittelh1');
tittelh1.setAttribute('class', 'header1');

// Lager teksten for tittelen
var titteltekst = document.createTextNode("SNOOP'S HUNT");
// Appender teksten og tittelen til gamen
tittelh1.appendChild(titteltekst);
game.appendChild(tittelh1);

// Lager teksten til knappen.
var starth1 = document.createElement('h1');
starth1.setAttribute('id', 'starth1');
starth1.setAttribute('class', 'header1');

var starttekst = document.createTextNode("START");
starth1.appendChild(starttekst);

//Lager startknappen, som kaller funksjonen startFunc();
var startknapp = document.createElement('button');
startknapp.setAttribute('onclick', 'startFunc()');
startknapp.setAttribute('id', 'startknapp');
startknapp.setAttribute('class', 'knapp');

// Appender starth1 til knappen og knappen til spillet
startknapp.appendChild(starth1);
game.appendChild(startknapp);

// Sørger for at alle funksjoner kjører og resetter spillet
function startFunc() {
  // Hvis startknappen finnes så kjører koden den if-delen av koden
  musikk.play();
  if (document.getElementById('startknapp') != null) {
    game.removeChild(startknapp);
    game.removeChild(tittelh1);
    drawTimer();
    drawWeed();
    scoreBoardUpdate();
  }
  // Når startknappen ikke finnes betyr det at restartknappen aktiverer koden og da kjører den delen
  else {
    game.removeChild(restartknapp);

    time = 30;
    score = 0;
    drawTimer();
    drawWeed();
    scoreBoardUpdate();
    timerH1.style.display = 'inline';
    scoreH1.style.display = 'inline';
    if (document.getElementById('vinn') != null) {
      game.removeChild(vinn);
      game.removeChild(snoopWin);
    } else {
      game.removeChild(tap);
    }

  }


}

// Timer funksjon
function drawTimer() {

  //Siden funksjonen blir kjørt når spillet starter, oppdaterer denne bare timeren, viser den fram.
  timerH1.innerHTML = 'Time: ' + time;

  // Timer, starter en interval som kjører hvert sekund.
  var timerInterval = setInterval(function() {
    // Sjekker time fortsatt er større enn null, hvis den er sann så er spillet igang og timeren dekrementerer.
    if (time > 0) {
      time--;
      timerH1.innerHTML = 'Time: ' + time;
    }
    // Ellers så er spillet ferdig.
    else {
      clearInterval(timerInterval);
      musikk.pause();
      musikk.currentTime = 0;
      // Sørger for at gutten, snakkeboble og politi blir fjernet, hvis de finnes.

      //Sjekker om det er en weed tilstede, og fjerner den.
      if (document.getElementById('weed' + divId) != null) {
        clearTimeout(weedTimeout);
        game.removeChild(document.getElementById('weed' + divId));
      }
      //Fjerner timer og score.
      timerH1.style.display = 'none';
      scoreH1.style.display = 'none';

      // Sjekker om scoren er større enn vinn kravet, og kjører kode hvis den er sant.
      if (score >= 1) {
        // Lager en div som skal inneholde vinn-teksten
        var vinn = document.createElement('div');
        vinn.setAttribute('id', 'vinn');

        // Lager vinn teksten
        var vinnTekst = document.createTextNode('Du vant! Scoren din ble ' + score);

        // Lager H1 for vinn teksten og setter attributer for CSS muligheter.
        var vinnh1 = document.createElement('h1');
        vinnh1.setAttribute('id', 'vinnh1');
        vinnh1.setAttribute('class', 'header1');

        // SNOOP IMG NÅR DU VINNER
        var snoopWin = document.createElement('img');
        snoopWin.setAttribute('src', './img/SnoopWin.gif');
        snoopWin.setAttribute('id', 'snoopWin');

        vinn.appendChild(snoopWin);


        vinnh1.appendChild(vinnTekst);
        vinn.appendChild(vinnh1);


        game.appendChild(vinn);
        game.appendChild(restartknapp);
      } else {
        // Lager en tap div som skal inneholde tap tekst og restart knapp.
        var tap = document.createElement('div');
        tap.setAttribute('id', 'tap');

        // Lager en tap tekst
        var tapTekst = document.createTextNode('Du tapte! Scoren din ble ' + score + '. Prøv igjen.');

        // Lager en h1 for tap teksten
        var taph1 = document.createElement('h1');
        taph1.setAttribute('id', 'taph1');
        taph1.setAttribute('class', 'header1');

        // SNOOP IMG NÅR DU TAPER
        var snoopLose = document.createElement('img');
        snoopLose.setAttribute('src', './img/SnoopLose.gif');
        snoopLose.setAttribute('id', 'snoopLose');

        tap.appendChild(snoopLose);
        // Appender teksten til h1 og alt til game.
        taph1.appendChild(tapTekst);
        tap.appendChild(taph1);

        game.appendChild(tap);
        game.appendChild(restartknapp);

      } //Avslutter score sjekk if-setningen
    } // Avslutter timer if-setningen
  }, 1000); // Avslutter timerInterval
}

// Oppdaterer scoreboard når funksjon er kalt, den vurderer parameteren om den er + eller -.
function scoreBoardUpdate(change) {
  switch (change) {
    case '+':
      if (is_safari) {
        score++;
        return;
      } else {
        score++;
        plussLyd.play();
      }
      break;
    case '-':
      if (is_safari) {
        score--;
      } else {
        score--;
        minusLyd.play();
      }
      break;
    case '3':
      if (is_safari) {
        score -= 3;
      } else {
        score -= 3;
        minusLyd.play();
      }
  }
  scoreH1.innerHTML = "Score: " + score;
}

// Lager en weed, setter attributter aånn at vi kan bruke det i koden og css selectorer.
function Weed(divId) {
  this.id = divId;
  this.draw = function() {
    var weed = document.createElement('div');
    weed.setAttribute('id', 'weed' + this.id++);
    weed.setAttribute('class', 'weed');
    weed.setAttribute('onclick', 'weedClick(' + weed.id + ');');
    weed.style.backgroundImage = 'url("./img/plante.gif?' + weed.id + '")';
    weed.style.marginLeft = Math.random() * 600 + 'px';

    game.appendChild(weed);
    if (time > 0) {
      weedTimer(weed);
    } //Avslutter timer sjekk if-setningen
  }; //Avslutter draw-funksjonen
} //Avslutter hele tegne-funksjonen


var weedTimeout;
// Timerfunksjon for hver plante med tilfeldig levetid r
// Avslutter timeren hvis gutt finnes
function weedTimer(weed) {
  weedTimeout = setTimeout(function() {
    if (document.getElementById('gutt') != null) {
      clearTimeout(weedTimeout);
    } //Avslutter gutt sjekk if-setningen
    else { //Gjør at man mister poeng hvis en plante forsvinner
      // før man trykker på den
      clearTimeout(weedTimeout);
      deleteWeed(weed, '-');
    } //Avslutter gutt sjekk else-setningen
  }, Math.random() * (4000 - 1500) + 1500);

}


// Funksjon som kjører hver gang en plante blir trykket på,
// resetter timer og gir 1 poeng, med mindre politibil finnes,
// da blir det minus 3 poeng
function weedClick(weed, change) {
  if (document.getElementById('politi') != null && time > 0) {
    clearTimeout(weedTimeout);
    deleteWeed(weed, '3');
  } else {
    clearTimeout(weedTimeout);
    deleteWeed(weed, '+');
  }
}

// Tegner plante og begynner drawGutt(); hvis if condition er riktig
function drawWeed() {
  var weed = new Weed(divId);
  weed.draw();
  if (time < 29 && time > 2 && (Math.random() * (2000 - 1000) + 1000) < 1200 && document.getElementById('gutt') == null) {
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
    politi.setAttribute('src', './img/politi.png');
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
          weedTimer(document.getElementById('weed' + divId));
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
    gutt.setAttribute('src', './img/gutt.png');
    gutt.setAttribute('draggable', 'false');
    game.appendChild(gutt);

  };

}

function Snakkeboble() {
  this.draw = function() {
    var quotes = document.createElement('div');
    quotes.setAttribute('id', 'quotes');
    var quoteslist = ['./img/1.png', './img/2.png', './img/3.png', './img/4.png'];
    var img = document.createElement('img');
    img.setAttribute('id', 'snakkeboble');
    img.src = quoteslist[Math.floor(Math.random() * quoteslist.length)];
    quotes.appendChild(img);
    game.appendChild(quotes);
  };
}

// Tegner en politibil og Snakkeboble
function drawPoliti() {
  var imgPoliti = new Politi();
  imgPoliti.draw();
}

function drawSnakkeboble() {
  var imgSnakkeboble = new Snakkeboble();
  imgSnakkeboble.draw();
}

// Tegner en gutt og kaller drawPoliti() setTimeout slik at den starter to sekunder etter gutten
function drawGutt() {

  var imgGutt = new Gutt();
  imgGutt.draw();

  setTimeout(function() {
    drawSnakkeboble();
  }, 1000);

  setTimeout(function() {
    drawPoliti();
  }, 2000);
}
