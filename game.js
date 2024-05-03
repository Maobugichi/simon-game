var buttonColors = ['red', 'blue', 'green', 'yellow']

//create an empty array to store the gamepattern(random generated colors)
var gamePattern = []

//create an empty array to store the userpattern(clicked colors)
var userClickedPattern = []

//toggle to start the game
var started = false;

//level to update the game
var level = 0;


//keydown event triggering a function to call next sequence, update level, to be used only once
$(document).keydown(function () {
  if (started !== true) {
    nextSequence()
    $('#level-title').text('Level ' + level)
    started = true
  }
 
})

//click event on any button
//used to retrieve id of the button clicked
$('.btn').click(function () {
  //the user chosen pattern or clicked button
  var userChosenColor = this.id
  //adding the clicked id to the userpattern array
  userClickedPattern.push(userChosenColor)
  //function to play sound
  playSound(userChosenColor)
  //function to add a class to the clicked button
  animatePress(userChosenColor)
  //function that checks both game pattern and user pattern
  checkAnswer(userClickedPattern.length-1)
})


function checkAnswer(currentLevel) {
  //if statement to check if the last index of the user pattern = that of game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //if statement to check if the length of both is equal
    //so the game can progress
    if (userClickedPattern.length === gamePattern.length) {
      //if every condition is fulfilled the next sequence function is repeatedly called after 1000ms
      setTimeout(function () {
        nextSequence()
      },1000)
    }
  } 
  //if the if statement condition is not met then this condition is fulfilled
  else {
    //function to play sound
    playSound('wrong')
    //adding class to the body
    $('body').addClass('over')
    //removing class from body
    setTimeout( function () {
      $('body').removeClass('over')
    },200)
//change heading title
    $('#level-title').text('Game Over, Press Any Key to Restart')

    startOver()
  }
}

//next sequence function
function nextSequence() {
  //when next sequence is called, user pattern is refreshed
  userClickedPattern = []
  //level is updated by 1 each call
  level++
  //heading is changed to indicate start
  $('#level-title').text('Level ' + level)

  //random number generation
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber)

  //button color array picked color using random generated number
  var randomChosenColor = buttonColors[randomNumber]

  //adding the value to the game pattern array
  gamePattern.push(randomChosenColor)

  //fade out animation
  $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound
  playSound(randomChosenColor)
   
  
}


//function to play sound
function playSound(name) {
  //code to play sound
  var sound = new Audio('sounds/' + name + '.mp3')

  sound.play()
}

//add the pressed class
function animatePress(currentColor) {
  //addition of pressed class
  $('.' + currentColor).addClass('pressed')
//removal of pressed class
  setTimeout(function () {
    $('.' + currentColor).removeClass('pressed')
  },100)
}

//startover function if game gets failed
function startOver() {
  //reset level
  level = 0;
  //reset game pattern
  gamePattern = []
  //reset toggle option
  started = false
}