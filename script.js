// hello i wrote this and it works and idk why or what i'm doing please send help // i am c r y i n g

// Assignment Code
var generateBtn = document.querySelector("#generate");

// FIX THIS BITCH
function validLength(input, min, max) {
	return input >= min || input <= max;
}

function isCharSetOption(item){
	return item.value === undefined;
}

// What we need, the default value, and how to ask the user for the information
var passwordOptions = [
	{
		option: "length",
		value: 0,
		min: 8,
		max: 128,
		validator: validLength,
		prompt: "Please enter number between 8 - 128.",
		passwordGeneratorField: 'leng'
	},
	{
		option: "uppercase",
		selected: false,
		prompt: "Do you want uppercase characters?",
		passwordGeneratorField: 'hasUpper'
	},
	{
		option: "lowercase",
		selected: false,
		prompt: "Do you want lowercase characters?",
		passwordGeneratorField: 'hasLower'
	},
	{
		option: "numbers",
		selected: false,
		prompt: "Do you want numbers?",
		passwordGeneratorField: 'hasNumber'
	},
	{
		option: "symbols",
		selected: false,
		prompt: "Do you want special characters?",
		passwordGeneratorField: 'hasSymbol'
	},
];

// Error alerts bc users are dumb
var optionErrors = {
	selectOne: "You must select at least one character set!",
	validLength: "Number must be between 8 and 128!"
}


function assignment() {

	// Annoy the user until they break and give us the information we need
	passwordOptions.forEach(function(item){
		// This is a passwordOption input
		if (isCharSetOption(item) === true) {
			var i = 0;
			if(isValid.lengthInput < item.min || isValid.lengthInput > item.max) {
				item.value = alert(item.prompt); 
			}
			if(isValid.selectOne === false || i < passwordOptions.length) {
				item.selected = confirm(item.prompt);
			
				// This is validating that user selected one of the options
				if (item.selected === true) {
					isValid.selectOne = true;
				}
			i++;
			}
		} 
		else {
			// Ask until the user either complies or leaves the page to go somewhere else
			while(isValid.validLength === false) {
				item.userInput = parseInt(prompt(item.prompt)); 

				if (isNaN(+item.userInput)){
					item.prompt = optionErrors.lengthInput;
				}
				else if (item.validator(item.userInput, item.min, item.max)) {
					item.value = item.userInput;
					isValid.validLength = true;
				}
				else {
					item.prompt = optionErrors.validLength;
				}
			}
		}
	});

console.log(passwordOptions);
}

var isValid = {
	validLength: false,
	selectOne: false, 
	lengthInput: {
		min: 8,
		max: 128
	}
}


var ass = assignment();

generateBtn.addEventListener("click", ass);

/**
 * HIGGINS! FETCH MY PASSWORD GENERATOR
 */

var options = {
    leng: 0,
    hasUpper: false,
    hasLower: false,
	hasSymbol: false,
	hasNumber: false
} 

function optionsMapper() {
	passwordOptions.forEach(function(item){
		if(isCharSetOption(item) === true) {
			options[item.passwordGeneratorField] = item.selected;
		}
		else {
			options[item.passwordGeneratorField] = item.value;
		}
	});
}

optionsMapper();

console.log(options);

var password = PasswordGenerator(options);

console.log(password); 


function PasswordGenerator(options){
	
	// Assign values to the options
	var leng = options.leng,
		hasUpper = options.hasUpper,
		hasLower = options.hasLower,
		hasSymbol = options.hasSymbol,
		hasNumber = options.hasNumber;

	// Define function to get a random number
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    
    var coder = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTVUWXYZ'.split(''),
        lowercase: 'abcdefghijklmnopqrstvuwxyz'.split(''),
        symbols: '_!@#$%^&*~'.split(''),
        numbers: '1234567890'.split(''),
    }
    
    var decoder = [];

    var groups = function(){
        return decoder.length;
    };

    // function to increment number of groups & to push the key
    function passwordCriteria(condition,key) {
        if(condition) {
            decoder.push(key);
        } 
    }

    passwordCriteria((hasUpper === true), 'uppercase');
    passwordCriteria((hasLower === true), 'lowercase');
	passwordCriteria((hasSymbol === true), 'symbols');
	passwordCriteria((hasNumber === true), 'numbers');

    // Remainder of integer division (i.e.; 10 / 3 = 3 R1)
	var offset = leng % groups();
	
	// right shift ( >> ) truncates decimal to an integer
	// var distOfGroups = (leng / groups()) >> 0;

	// even number of characters to pull from each selected group based on length (not remainder or decimal)
	var distOfGroups = parseInt((leng / groups()));
    var password = [];

	

    for(var i = 0; i < distOfGroups; i++){ //repeat 3x
        
        for(var j = 0; j < groups(); j++){ //also repeat 3x

			//assign things lol
            var key = decoder[j], // lowercase
                keySet = coder[key], // abcde .... but an array oof
                randomIndex = getRndInteger(0, keySet.length - 1), // 5
                letter = keySet[randomIndex];

            password.push(letter);
    	}
    }

	// length: 9 / all 4 groups
	// distOfGroups: 2
	// pw length before remainder: 8
	// offset: 1

    for(var k = 0; k < offset; k++){ // finish this loop
		// what to do with the offset (remainder of integer division)
		var jeffSmells = decoder[getRndInteger(0, decoder.length - 1)],
			jeffShowered = coder[jeffSmells],
			randomCeption = getRndInteger(0, jeffShowered.length - 1),
			rettel = jeffShowered[randomCeption];

		password.push(rettel); 
    }

    // randomize ???

	function randomizePassword(password) {
		var currentIndex = 0,
			tempValue,
			randomIndex;

		while (currentIndex < password.length) {
			randomIndex = getRndInteger(0, password.length - 1);
			
			tempValue = password[currentIndex];
			password[currentIndex] = password[randomIndex];
			password[randomIndex] = tempValue;

			currentIndex++;
		}

		return password;
	}

	password = randomizePassword(password);

    return {
        password: password.join('')
    }
}



/**
 *    User will click button
 *      Prompt requesting password length 
 *        Validate that input is a number
 *        Validate that the number is >= 8 / <= 128
 *      If invalid - display error alert (Please enter number between 8 - 128)
 *      If valid, user is prompted for criteria:
 *        Lowercase Letters (Y/N) 
 *        Uppercase Letters (Y/N)
 *        Numbers (Y/N)
 *        Symbols (Y/N)
 *          Validate that one character set is selected
 *            Invalid - Error alert, loop again
 *            Valid - Generate password & displayed in box on screen lol
 */

// Write password to the #password input
function writePassword() {
	// var password = generatePassword();

	var passwordText = document.querySelector("#password");

	passwordText.value = password.password;

}

writePassword();