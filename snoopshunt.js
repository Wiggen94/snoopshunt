//ALDERSVERIFISERING
window.onLoad = checkage();

function checkage() {
  var agePrompt = prompt("Hvor gammel er du?");

  if (agePrompt >= 16) {} else if (isNaN(agePrompt)) {
    alert('Bokstaver er ikke tillatt! Vennligst kun bruk tall.');
    checkage();
  } else {
    alert('Beklager, du er for ung til å spille Snoops\' Hunt...');
    document.location = "https://google.com";
  }
}


//DARKMODE SOM GJØR ALT MØRKT FORUTENOM SPILLET OG TEKSTEN
var img_array = ['img/switch-on.png', 'img/switch-off.png'];
var i = -1;

function lysbryter() {
  if (i == 0) {
    i++;
    document.getElementById("myimg").src = img_array[i];
    document.body.style.backgroundColor = "white";
    document.getElementById('instruksjoner').style.color = 'black';
    document.getElementById('instruksjonstekst').style.color = 'black';
  } else {
    i = 0;
    document.getElementById("myimg").src = img_array[i];
    document.body.style.backgroundColor = "#1d1f21";
    document.getElementById('instruksjoner').style.color = '#B0B0B0';
    document.getElementById('instruksjonstekst').style.color = '#B0B0B0';
  }
}


//VIS INSTRUKSJONER UNDER SPILLET
  function displayinstruksjoner() {
  if (document.getElementById('instruksjoner').style.display == "block") {
    document.getElementById('instruksjoner').style.display = 'none';
  } else {
    document.getElementById('instruksjoner').style.display = 'block';

  }
}
