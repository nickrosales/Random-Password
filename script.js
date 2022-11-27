// Assignment Code
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var caps = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lower = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var symbols = ["!", "@", "#", "$", "%", "^", "&", "*"]
var generateBtn = document.querySelector("#generate");

function getNumber () {
  var passLengthNum = prompt("How many characters do you want your password to be? Enter a number between 8 and 128.");
  if(passLengthNum >= 8 && passLengthNum <= 128) {
      return passLengthNum
  } else {
    alert("Please enter a valid number");
    return getNumber();
      
  }
}

function passwordAnswers() {
  var passLengthNum = getNumber();
  var userChoiceNum = confirm("Do you want numbers in your password?");
  var lowerChoice = confirm("Do you want lower case letters in your password?");
  var capsChoice = confirm("Do you want upper case letters in your password?");
  var symChoice = confirm("Do you want symbols in your password?");
  
  var userInput = {
      nums: userChoiceNum,
      lowerCase: lowerChoice,
      upper: capsChoice,
      sym: symChoice,
      passLength: passLengthNum
  };
  return userInput
}

function makeRandom(length) {
  var randomPass = Math.floor(Math.random() * length);
return randomPass
}

function generatePassword() {
  var userInput = passwordAnswers();
  var passwordChars = [];
  var myPass = [];
  if(userInput.nums) {
    passwordChars = passwordChars.concat(numbers);
  }
  if(userInput.lowerCase) {
    passwordChars = passwordChars.concat(lower);
  }
  if(userInput.upper) {
    passwordChars = passwordChars.concat(caps);
  }
  if(userInput.sym) {
    passwordChars = passwordChars.concat(symbols);
  }
  for(var i = 0; i < userInput.passLength; i++) {
    myPass.push(passwordChars[makeRandom(passwordChars.length)])
  }
 myPass = editPass(userInput, myPass)





  return myPass.join("")
}

function editPass(userInput, myPass) {
  for(i = 0; i < 4; i++) {
    if (myPass.some(r=> numbers.includes(r))) {
    } else if (userInput.nums) {
        myPass.splice(0, 1, "3")
    }
    if (myPass.some(r=> lower.includes(r))) {
    } else if (userInput.lowerCase) {
        myPass.splice(1, 1, "j")
    }
    if (myPass.some(r=> caps.includes(r))) {
    } else if (userInput.upper) {
        myPass.splice(2, 1, "K")
    }
    if (myPass.some(r=> symbols.includes(r))) {
    } else if (userInput.sym) {
        myPass.splice(3, 1, "%")
    }
  }
  return myPass
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
