var colors = ["green", "red", "yellow", "blue"];
var userChosenPattern = [];
var pattern = [];
var level = 0;

function random() {
  $("h1").text("level " + level);
  value = Math.floor(Math.random() * 4);
  colorChosen = colors[value];
  pattern.push(colorChosen);
  blink(colorChosen);
  level++;
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function blink(color) {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
  playSound(color);
}

function pressedAnimation(currentKey) {
  $("#" + currentKey).addClass("pressed");
  setTimeout(function () {
    $("#" + currentKey).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("h1").text("Game Over, Restart By Pressing A Key");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);
  userChosenPattern = [];
  pattern = [];
  level = 0;
}

$(document).keypress(function () {
  random();
});

$(".button").click(function () {
  userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  console.log(userChosenPattern);
  console.log(pattern);
  playSound(userChosenColor);
  pressedAnimation(userChosenColor);
  len = userChosenPattern.length - 1;
  if (userChosenPattern[len] === pattern[len]) {
    if (userChosenPattern.length === pattern.length) {
      userChosenPattern = [];
      setTimeout(function () {
        random();
      }, 500);
    }
  } else {
    gameOver();
  }
});
