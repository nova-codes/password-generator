# Password Generator

A javascript-powered password generator. The script will prompt the user for a length, and ask them to confirm the character sets they would like to include in the password (numbers, symbols, uppercase, and lowercase letters.)

The resulting password will conform to the users input in terms of length and characters included, and will be output to a text area from where the user can copy and paste it.

# How It Works

A semi-brief explanation of how the script works.

## Asking the user for input

The script is executed by clicking the 'Generate Password' button on the main screen. In the most heavy-handed way, it will use prompts, alerts, and confirms to ask the user for their choices. If the length of the password is outside of the minimum and maximum parameters, it prompts to user to input a valid length. If the value entered for the password length is not a number, it alerts the user and asks them to input a number. If the value entered is a decimal the script will parse the integer from the input and output a password with the integer length (i.e., 16.4 will only output 16 characters.)

It will then iterate through the character set options (numbers, letters, symbols, etc.) and ask them to confirm (Yes/No, true/false, OK/Cancel) if they want a certain character set included in the password. If the user does not select any of the options, they are alerted with an error that they must select one of the character sets, then it iterates through the options again until at least one character set is selected.

## Using the input

Once all of the options have been iterated through, the script flags the user options as 'true' and temporarily stores those options in an array that will be iterated through again. From this array it will go through the character set arrays and select a random value and push it to an empty array for safe keeping.

If the quotient of the length of the password divided by the number of character sets is not a whole number (i.e., 10/2 = 5 is a whole number, but 10/3 = 3 R1) the script will randomly select one of the character sets, and then iterate through the array for that character set and push that value to the password array.

## Really random

Once all of the possible values are pushed to the password array, the script then shuffles those values around, otherwise the password output to the user has a predictable pattern to their password. (i.e., lowercase, symbol, number, lowercase, symbol, number) further increasing the strength of the password presented to the user.

## Complete

After the password array is shuffled, the array is then joined into a string with the commas removed, and is displayed to the user in the textarea above the 'Generate Password' button. Once the script has successfully executed, the button can be clicked again to generate a new password.
