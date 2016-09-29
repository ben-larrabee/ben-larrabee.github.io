//=================================================================
// Variable Declaration
var d = []; // the computers three numbers
var currentGuess = 1; // counts up from 1 to 10, helps place row.
var g = [0, 1, 2]; // triplet
var gameOver;
var exactmatch = "panel-success";
var numbermatch = "panel-warning";
var nomatch = "panel-danger";
var newline;
var replay;

// -------------------------------------------------
$(document).ready(function(){
  d = computerGuess();
  postAlert("I have three numbers in mind, care to guess?");
  $("#process").click(function(){
    g = [parseInt($("#fDigit").val()), parseInt($("#sDigit").val()), parseInt($("#tDigit").val())]; 
    for (var i = 0; i < 3; i++){
      if (g[i] < 0 || g[i] > 9 ) {
        return postAlert("You have input an invalid number");
      }
    }
    if (g[0] == g[1] || g[0] == g[2] || g[1] == g[2]){
      postAlert("Heads up!  Your guess was submitted, but it really isn't possible to have duplicates.  Just so you know");
    }
    lineMaker(g);    
    $(".container").append(newline);
    if (g[0] == d[0] && g[1] == d[1] && g[2] == d[2]) {
      postAlert("Wow, you won!");
      floatAlert(d);
      gameOver = true;
      // stripped
    } else {
      currentGuess++;
      $("#remaining").html(11 - currentGuess);
      if (currentGuess == 10) {
        postAlert("Last chance!!!");
      }
      if (currentGuess > 10) {
        floatAlert(d);
        gameOver = true;
         
        // stripped
        /* , function(){
          postPrompt("Would you like to play again?", null, null);
        } */
      }
    }
    if (gameOver) {
      playAgain();
    }
  });//end click
});//end documentready

//--------------------------
// Function definitions
computerGuess = function(){
 var digitOne = Math.floor(Math.random()*10);
 var digitTwo;
 var digitThree;
 do {
   digitTwo = Math.floor(Math.random()*10);
 } while (digitTwo == digitOne);
  do {
   digitThree = Math.floor(Math.random()*10);  
  } while (digitThree == digitOne || digitThree == digitTwo);
  return [digitOne, digitTwo, digitThree];
}
postAlert = function(someText) {
//  alert(someText);
 var alertmessage = $("#alertmaker").html();
 alertmessage = alertmessage.replace("@@target@@", someText);
 $(".container").append(alertmessage);
}
disableSubmit = function() {
  $("#process").disabled = true;
}
floatAlert = function(share) {
//  alert(share);
  lineMaker(share);
  newline = newline.replace("<li><h4>Guess ", "");
  newline = newline.replace("</h4></li>", "");
  postAlert(newline);
}
// postPrompt = function(someText, result1, result2){
//   var answer = prompt(someText);
//   if (answer[0].toUpperCase() == "Y") {
//     location.reload();
//   } else{
//     location.assign("http://www.hampsterdance.com/classics/interactivedance.htm");
//   }
// }
lineMaker = function(g) {
  newline = $("#rowmaker").html();
    newline = newline.replace("@@num@@", currentGuess);
    newline = newline.replace("@@first@@", g[0]);
    newline = newline.replace("@@second@@", g[1]);
    newline = newline.replace("@@third@@", g[2]); 
    if (g[0] == d[0]) {
      newline = newline.replace("@@match1@@", exactmatch);
      newline = newline.replace("@@desc1@@", "Match !!!!");
    } else if (g[0] == d[1] || g[0] == d[2]) {
      newline = newline.replace("@@match1@@", numbermatch);
      newline = newline.replace("@@desc1@@", "It's Close!");
    } else {
      newline = newline.replace("@@match1@@", nomatch);
      newline = newline.replace("@@desc1@@", "No Match");
    }
    if (g[1] == d[1]) {
      newline = newline.replace("@@match2@@", exactmatch);
      newline = newline.replace("@@desc2@@", "Match !!!!");
    } else if (g[1] == d[0] || g[1] == d[2]) {
      newline = newline.replace("@@match2@@", numbermatch);
      newline = newline.replace("@@desc2@@", "It's Close!");
    } else {
      newline = newline.replace("@@match2@@", nomatch);
      newline = newline.replace("@@desc2@@", "No Match");
    }
    if (g[2] == d[2]) {
      newline = newline.replace("@@match3@@", exactmatch);
      newline = newline.replace("@@desc3@@", "Match !!!!");
    } else if (g[2] == d[0] || g[2] == d[1]) {
      newline = newline.replace("@@match3@@", numbermatch);
      newline = newline.replace("@@desc3@@", "It's Close!");
    } else {
      newline = newline.replace("@@match3@@", nomatch);
      newline = newline.replace("@@desc3@@", "No Match");
    }      
}
playAgain = function(){
  setTimeout(function() {
    replay = prompt("Would you like to play again?"); }, 1600);
    setTimeout(function() { nextStep(replay); }, 1800);

}
nextStep = function(response){
  if (response[0].toUpperCase() == "Y") {
  location.reload();
  } else {
    location.assign("http://www.hampsterdance.com/classics/interactivedance.htm");
  }
}
function myFunction() {
    setTimeout(function(){ prompt("Hello"); }, 1000);
}