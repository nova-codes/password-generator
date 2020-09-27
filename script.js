// hello i wrote this and it works and idk why or what i'm doing please send help 
// i am c r y i n g

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Function to assign things
function assignment() {

	// Does the user input for password length fall between the minimum and maximum allowed?
	function validLength(input, min, max) {
		return input >= min && input <= max;
	}

	// Determines if the item selected has a value or not
	function isCharSetOption(item) {
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

	// Flag object to validate user input 
	var validFlags = {
		validLength: false,
		selectOne: false,
	}

	// Object containing error alerts
	var optionErrors = {
		selectOne: "ERROR: You must select at least one character set!",
		validLength: "ERROR: Number must be between 8 and 128!",
		isNumber: "ERROR: Invalid character. Please enter a number."
	}

	
	function confirmChoice(item) {
		var i = 0;

		if (validFlags.selectOne === false || i < passwordOptions.length) {
			item.selected = confirm(item.prompt);

			// This is validating that user selected one of the options
			if (item.selected === true) {
				validFlags.selectOne = true;
			}
			i++;
		}
	}

	function userLength(item) {
		while (validFlags.validLength === false) {
			var promptVal = prompt(item.prompt);

			item.userInput = parseInt(promptVal);

			//if user input is not a number, tell them to input a number.
			if (isNaN(+item.userInput)) {
				item.prompt = optionErrors.isNumber;
			}
			else if (item.validator(item.userInput, item.min, item.max)) {
				item.value = item.userInput;
				validFlags.validLength = true;
			}
			else {
				item.prompt = optionErrors.validLength;
			}
		}
	}

	function promptUserForInput() {
		while (validFlags.selectOne === false) {
			for (var item of passwordOptions) {
				if (isCharSetOption(item) === true) {
					confirmChoice(item);
				}
				else {
					// Ask until the user either complies or leaves the page to go somewhere else
					userLength(item);
				}
			}
			if (validFlags.selectOne === false) {
				alert(optionErrors.selectOne);
			}
		}
	}

	var options = {
		leng: 0,
		hasUpper: false,
		hasLower: false,
		hasSymbol: false,
		hasNumber: false
	}

	function optionsMapper() {
		passwordOptions.forEach(function (item) {
			if (isCharSetOption(item) === true) {
				options[item.passwordGeneratorField] = item.selected;
			}
			else {
				options[item.passwordGeneratorField] = item.value;
			}
		});
	}

	function PasswordGenerator(options) {

		// Assign values to the options
		var leng = options.leng,
			hasUpper = options.hasUpper,
			hasLower = options.hasLower,
			hasSymbol = options.hasSymbol,
			hasNumber = options.hasNumber;

		// Define function to get a random number
		function getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		var coder = {
			uppercase: 'ABCDEFGHIJKLMNOPQRSTVUWXYZ'.split(''),
			lowercase: 'abcdefghijklmnopqrstvuwxyz'.split(''),
			symbols: '_!@#$%^&*~'.split(''),
			numbers: '1234567890'.split(''),
		}

		var decoder = [];

		var groups = function () {
			return decoder.length;
		};

		// function to increment number of groups & to push the key
		function passwordCriteria(condition, key) {
			if (condition) {
				decoder.push(key);
			}
		}

		passwordCriteria((hasUpper === true), 'uppercase');
		passwordCriteria((hasLower === true), 'lowercase');
		passwordCriteria((hasSymbol === true), 'symbols');
		passwordCriteria((hasNumber === true), 'numbers');

		// even number of characters to pull from each selected group based on length (not remainder or decimal)
		var distOfGroups = parseInt((leng / groups()));

		// Remainder of integer division (i.e.; 10 / 3 = 3 R1)
		var offset = leng % groups();

		// create an empty array to push random values to
		var password = [];

		for (var i = 0; i < distOfGroups; i++) { 

			for (var j = 0; j < groups(); j++) { 

				var key = decoder[j], 
					keySet = coder[key], 
					randomIndex = getRndInteger(0, keySet.length - 1), 
					letter = keySet[randomIndex];

				password.push(letter);
			}
		}

		// what to do with the offset (remainder of integer division)
		for (var k = 0; k < offset; k++) {

			var offKey = decoder[getRndInteger(0, decoder.length - 1)],
				offKeySet = coder[offKey],
				randomCeption = getRndInteger(0, offKeySet.length - 1),
				randomized = offKeySet[randomCeption];

			password.push(randomized);
		}


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

	return {
		getPasswordOptions: promptUserForInput,
		generatePassword: function () {
			optionsMapper();
			var pg = new PasswordGenerator(options);
			return {
				password: pg.password
			}
		}


	}


};

// Write password to the #password input
function assignmentDriver() {
	var myAss = new assignment();
	myAss.getPasswordOptions();

	var result = myAss.generatePassword();

	var passwordText = document.querySelector("#password");

	passwordText.value = result.password;

}


generateBtn.addEventListener("click", assignmentDriver);
