var userWord = [];
var counter = 10;
var placeHolder = [];
var userGuesses = [];
var imgCounter = 1;
var revealCount = 1;

$(document).ready(function(){

$('#guessNum').html(counter);

$('#reset').click(function() {
  $('#imgDisplay').removeClass('img' + imgCounter + '');
  userWord = [];
  counter = 10;
  placeHolder = [];
  userGuesses = [];
  imgCounter = 1;
  revealCount = 1;
  $('#imgDisplay').addClass('img' + imgCounter + '');
  $('#guessNum').html(counter);
  $('#nope').html(userGuesses);
  $('#wordDisplay').html(userGuesses);

});


$('#userInputBtn').click(function() {
    var inputText = document.getElementById('userInput').value;
    var whiteSpace = /^[a-zA-Z]+$/.test(inputText);
    if (whiteSpace === !true) {
      alert("Bad Monkey! Only input a single word! No spaces, numbers, or other characters.");
    } else {
      saveWord(inputText);
    }
});

function saveWord(str) {
  for(i=0; i<str.length; i++) {
    userWord.push(str[i]);
    $('#wordDisplay').append("<span id=w" + i + " class='hiddens'" + ">" + str[i] + "</span>");
    document.getElementById('userInput').value= "";
  }
}

$('#userGuessBtn').click(function(str) {
  var guessText = document.getElementById('userGuesses').value;
  var whiteSpace = /^[a-zA-Z]+$/.test(guessText);
  if(userWord.length === 0 ) {
    alert("Please input a word first!");
  }else if(counter === 0){
    alert("Please reset the game and start again!");
    return;
  }else if(guessText.length >=2){
    alert("Please only guess one letter at a time!");
    return;
  }else if (whiteSpace === !true) {
    alert("Bad Monkey! Only guess letters! No spaces, numbers, or other characters!");
  } else {
    guessWord(guessText);
  }
});

function guessWord(str) {
  document.getElementById('userGuesses').value= "";

  if (userWord.indexOf(str) === -1) {
    if(counter === 1) {
        endGame();
    }
    counter--;
    $('#guessNum').html(counter);
    userGuesses.push(str);
    $('#nope').html(userGuesses.join(','));
    $('#imgDisplay').removeClass('img' + imgCounter + '');
    imgCounter++;
    $('#imgDisplay').addClass('img' + imgCounter + '');
  } else {
    for (i=0; i<userWord.length; i++){
      if(userWord[i] === str) {
        revealLetter(i);
        revealCount++;
      }
    }
  }
}

function revealLetter(index) {
  if(revealCount === userWord.length) {
    $('#w' + index +'').removeClass('hiddens');
    $('#w' + index +'').addClass('revealed');
    alert("YOU WIN! The game will now reset")
    setTimeout(function() { clear(); }, 1000);
  } else {
    $('#w' + index +'').removeClass('hiddens');
    $('#w' + index +'').addClass('revealed');
  }
}

function endGame() {
  alert("GAME OVER!");
  for (i=0; i<userWord.length; i++) {
    $('#w' + i +'').removeClass('hiddens');
    $('#w' + i +'').addClass('revealed');
  }
  return;
}

function clear() {
  $('#imgDisplay').removeClass('img' + imgCounter + '');
  userWord = [];
  counter = 10;
  placeHolder = [];
  userGuesses = [];
  imgCounter = 1;
  revealCount = 1;
  $('#imgDisplay').addClass('img' + imgCounter + '');
  $('#guessNum').html(counter);
  $('#nope').html(userGuesses);
  $('#wordDisplay').html(userGuesses);
}


});
