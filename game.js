var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level=0;

$(document).keypress(start);
$(".btn").on("click", handleClick);

function start(){
  if (started===false) {
    started=true;
    nextSequence();
    $("#level-title").text("Level " + level);
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function handleClick() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
}

function playSound(name)  {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var id = $("#" + currentColour);
  id.addClass("pressed");

  setTimeout(function(){
    id.removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  
  console.log(userClickedPattern.length-1);
  console.log(gamePattern[currentLevel]);
  console.log(userClickedPattern[currentLevel]);

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(nextSequence, 1000);
      }
    }
  else
  {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}