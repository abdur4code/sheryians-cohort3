// 1 Write a function expression for multiplication.
const multiply = function(a, b) {
    console.log(a * b);
}
multiply(4, 5);

// 2 Convert a normal function into an arrow function.
const add = (a, b) => {
    console.log(a + b);
};
add(10, 15);

// 3 Create a function that accepts unlimited numbers and returns their sum using rest operator.
function sum(...nums) {
    let total = 0;
    for (let num of nums) {
        total += num;
    }
    console.log(total);
}
sum(1, 2, 3, 4, 5);

// 4 Write a function that counts vowels in a string.
function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for(let char of str) {
        if(vowels.includes(char)) {
            count++;
        }
    }
    console.log(count);
}
countVowels("Abdur Rahim");

// 5 Create a function that checks if a string is palindrome.
function isPalindrome(str) {
    let revStr = "";
    for(let i = str.length -1; i >= 0; i--) {
        revStr += str[i];
    }
    if(str === revStr) {
        console.log(str + " is a palindrome.");
    } else {
        console.log(str + " is not a palindrome.");
    }
}

isPalindrome("madam");
isPalindrome("hello");

// 6 Write a callback function example using setTimeout.