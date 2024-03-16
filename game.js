var buttonNotes = ["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var sequenceIndex = 0;

$(document).keypress(function(event) {
  if (!started && event.key === 'Enter') {
    $("#level-title").text("Level " + level);
    generateSequence();
    playSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (started) {
    var userChosenNote = $(this).attr("id");
    userClickedPattern.push(userChosenNote);
    playSound(userChosenNote);
    animatePress(userChosenNote);
    
    // Check user's answer after each click
    checkAnswer(userClickedPattern.length - 1);
  }
});

function generateSequence() {
    gamePattern = [];
    for (var i = 0; i < level + 2; i++) {
      var randomNumber = Math.floor(Math.random() * buttonNotes.length);
      var randomChosenNote = buttonNotes[randomNumber];
      gamePattern.push(randomChosenNote);
    }
}

function playSequence() {
    $("#level-title").text("Watch the sequence...");
  
    var delay = 1000 - (level * 50); // Decrease delay by 50 milliseconds for each level
  
    var interval = setInterval(function() {
      var noteToPlay = gamePattern[sequenceIndex];
      $("#" + noteToPlay).addClass("pressed");
      playSound(noteToPlay);
      setTimeout(function() {
        $("#" + noteToPlay).removeClass("pressed");
      }, 300); // Delay between pressing and releasing the note
  
      sequenceIndex++;

      
  
      if (sequenceIndex >= gamePattern.length) {
        clearInterval(interval);
        $("#level-title").text("Your turn...");
        sequenceIndex = 0; // Reset sequence index for user input
      }
    }, delay); // Delay between each note
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Enter to Restart");
    startOver();
    return;
  }

  console.log("success");
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextLevel();
    }, 1000);
  }
}

function playSuccessSound() {
    var successAudio = new Audio("sounds/success.mp3");
    successAudio.play();
}

function nextLevel() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    generateSequence();
    setTimeout(playSequence, 1000);
    playSuccessSound(); // Play success sound for each new level
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = []; // Reset user's clicked pattern
    sequenceIndex = 0; // Reset sequence index

    // Play the "wrong" sound before refreshing
    playSound("wrong");

    // Delay the page refresh by 1 second (1000 milliseconds)
    setTimeout(function() {
      location.reload(); // Refresh the page
    }, 4000);
}



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/////////////////////////////////////////////////////////////////////////////////

// Add event listener for the "Free Style Piano" button
$("#free-style-button").click(function() {
  // Allow users to click piano keys and play sounds freely
  $(".btn").click(function() {
    var userChosenNote = $(this).attr("id");
    playSound(userChosenNote);
  });
});

// Function to play the sound for a given note
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

///////////////////////////////////////////////////////
// Add event listener for the "Start Game" button
$("#start-game-button").click(function() {
  // Start the game when the button is clicked
  startGame();
});

// Function to start the game
function startGame() {
  if (!started) {
    $("#level-title").text("Level " + level);
    generateSequence();
    playSequence();
    started = true;
  }
}

// Detect Enter key press to start the game
$(document).keypress(function(event) {
  if (!started && event.key === 'Enter') {
    startGame();
  }
});
