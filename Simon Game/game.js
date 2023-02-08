var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (gamePattern.length % 5 === 0) {
      playSound('applause');
    }

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Game Over, Press Any Key to Restart');

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $('#level-title').text('Level ' + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  let counter = 0;

  if (gamePattern.length % 5 === 0) {
    setTimeout(congratSeq, 900);
  } else {
    setTimeout(loadSeq, 500);
  }

  function loadSeq() {
    $('#' + gamePattern[counter])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[counter]);
    counter++;
    if (gamePattern.length > counter) {
      setTimeout(loadSeq, 500);
    }
  }

  function congratSeq() {
    $('#' + gamePattern[counter])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[counter]);
    counter++;
    if (gamePattern.length > counter) {
      setTimeout(loadSeq, 900);
    }
  }
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

var ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var curId = 0;
setTimeout(loadSomething, 1000);
function loadSomething() {
  $('#result').text(ar[curId]);
  curId++;
  if (ar.length > curId) {
    setTimeout(loadSomething, 1000);
  }
}
