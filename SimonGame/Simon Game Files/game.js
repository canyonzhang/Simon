const colors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var firstClick = true
var level = 0


$(document).keydown(function() {
  console.log("in keypress function");
  if (firstClick) {
    console.log("first click");
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    nextSequence();
    $("#level-title").text("Level " + level);
    firstClick = false;
  }
  else{
    console.log("trying to startover");
    startOver();
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(".btn").click(function(event) {
  console.log("in button press function");
    var userChosenColor = $(this).attr("id"); //this can be used as a shortcut to object the query in context that just occured
    userClickedPattern.push(userChosenColor);
    var lastPressed = userClickedPattern.length-1; // each time the user presses another button, we pass in the last pressed button into the checkAnswer

    playSound(userChosenColor);
    //console.log(event);
    //console.log("userChosenColor is " + userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(lastPressed);
    //console.log(userClickedPattern);
});


//function that flashes the next square in the sequence
function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  console.log($("#" + randomColor));

  //make the colored square flash
  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);

}




function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //console.log("animating press");
  //console.log("currentColor is ", currentColor);
  var color = $("." + currentColor).addClass("pressed")
  setTimeout(function() {
    color.removeClass('pressed');
  }, 100);
  //console.log(currentColor.classList());
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){ // we have passed in the index of the last pressed button by a user, if it matches the index of the gamePattern, which is constant and strictly added to, we can say the user is right to that point
    console.log("success");

    if(userClickedPattern.length == gamePattern.length){ // if the length's of these two arrays are the same, that means we have pushed gamePattern.length items onto userClickedPattern successfully, and the next sequence can be played. Making sure to reset the userClickedPattern in the process
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  }
  else{
    console.log("false");
    var wrong = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over");
    setTimeout(function() {
      $("h1").html("Press Any Key to Play Again");

    }, 500);
  }
}

function startOver(){
  gamePattern = []
  userClickedPattern = []
  //firstClick = true
  level = 0
}
