const colors = ["red", "blue", "green", "yellow"]
const gamePattern = []
const userClickedPattern = []


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  console.log($("#" + randomColor));
  //make the colored square flash
  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}


$(".btn").click(function(event) {
    var userChosenColor = $(this).attr("id"); //this can be used as a shortcut to object the query in context that just occured
    playSound(userChosenColor);
    //console.log(event);
    //console.log("userChosenColor is " + userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    //console.log(userClickedPattern);
});

function playSound(name) {
  switch (name) { //switch on the variable name/randomColor
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;

    default:
  }
}

function animatePress(currentColor) {
  console.log("animating press");
  console.log("currentColor is ", currentColor);
  var color = $("." + currentColor).addClass("pressed")
  setTimeout(function() {
    color.removeClass('pressed');
  }, 100);
  //console.log(currentColor.classList());
}
