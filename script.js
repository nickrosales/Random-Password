// creates arrays in global scope
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var caps = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lower = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var symbols = ["!", "@", "#", "$", "%", "^", "&", "*"]

var generateBtn = document.querySelector("#generate");

// fuction makes sure the useer picks a valid number when asked how long they want their password
function getNumber () {
  var passLengthNum = prompt("How many characters do you want your password to be? Enter a number between 8 and 128.");
  if(passLengthNum >= 8 && passLengthNum <= 128) {
      return passLengthNum;
  } else {
    alert("Please enter a valid number");
    return getNumber();
      
  }
};

// adds prompts to select which types of characters and how long user wants password. stores user input into object. returns the created abject
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
  return userInput;
};

//creates a random number based on the length given
function makeRandom(length) {
  var randomPass = Math.floor(Math.random() * length);
return randomPass;
};

// generates user password based on user input
function generatePassword() {
  var userInput = passwordAnswers();
  var passwordChars = [];
  var myPass = [];
  // adds numbers array to the array of available characters for the password if they chose they wanted them
  if(userInput.nums) {
    passwordChars = passwordChars.concat(numbers);
  }
  // adds lower array to the array of available characters for the password if they chose they wanted them
  if(userInput.lowerCase) {
    passwordChars = passwordChars.concat(lower);
  }
  // adds caps array to the array of available characters for the password if they chose they wanted them
  if(userInput.upper) {
    passwordChars = passwordChars.concat(caps);
  }
  // adds symbols array to the array of available characters for the password if they chose they wanted them
  if(userInput.sym) {
    passwordChars = passwordChars.concat(symbols);
  }
  // generates the password based on the array of avalilable characters
  for(var i = 0; i < userInput.passLength; i++) {
    myPass.push(passwordChars[makeRandom(passwordChars.length)]) 
  }
// sends the password array to fuction to check if it has all the characters the user selected
 myPass = editPass(userInput, myPass);
// returns the password as a string
  return myPass.join("");
};

//checks the password to see if it has all the types of characters the user selected. adds them if they are missing any
function editPass(userInput, myPass) {
  // loops 4 times to make sure a user selected character was not replaced
  for(i = 0; i < Object.keys(userInput).length - 1; i++) {
    if (myPass.some(r=> numbers.includes(r))) {
    } else if (userInput.nums) {
        myPass.splice(0, 1, numbers[makeRandom(numbers.length)])
    };
    if (myPass.some(r=> lower.includes(r))) {
    } else if (userInput.lowerCase) {
        myPass.splice(1, 1, lower[makeRandom(lower.length)])
    };
    if (myPass.some(r=> caps.includes(r))) {
    } else if (userInput.upper) {
        myPass.splice(2, 1, caps[makeRandom(caps.length)])
    };
    if (myPass.some(r=> symbols.includes(r))) {
    } else if (userInput.sym) {
        myPass.splice(3, 1, symbols[makeRandom(symbols.length)])
    };
  };
  return myPass;
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
