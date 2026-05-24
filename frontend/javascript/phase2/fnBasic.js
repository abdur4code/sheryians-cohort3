// 1 Create a function named greet that prints "Hello World".
function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("Alice");
greet("Bob");

// 2 Create a function add(a, b) that returns the sum.
function add(a, b) {
    console.log(a + b) ;
}
add(5, 3);

// 3 Write a function to calculate the square of a number.
function square(x) {
    console.log(x * x);
}

square(4);

// 4 Create a function that checks whether a number is even or odd.
function isEven(num) {
    if (num % 2 === 0) {
        console.log(num + " is even.");
    }
    else {
        console.log(num + " is odd.");
    }
}

isEven(10);
isEven(7);

// 5 Write a function that converts Celsius to Fahrenheit.
function celciusToFahrenheit(celsius) {
    let fahrenheit = (celsius * 9/5) + 32;
    console.log(celsius + "°C is equal to " + fahrenheit + "°F.");
}
celciusToFahrenheit(34);
celciusToFahrenheit(17);

// 6 Create a function with default parameter "Guest".
function greeting(name = "Guest") {
    console.log("Hello, " + name + "!");
}
greeting("Alice");
greeting();

// 7 Write a function that returns the greater of two numbers.
function greaterOfTwoNumbers(a, b) {
    if (a > b) {
        console.log(a + " is greater than " + b);
    }
    else if (b > a) {
        console.log(b + " is greater than " + a);
    }
    else {
        console.log("Both numbers are equal.");
    }
}

greaterOfTwoNumbers(5, 10);
greaterOfTwoNumbers(20, 15);
greaterOfTwoNumbers(7, 7);

// 8 Create a function to calculate area of rectangle.
function areaOfRectangle(length, width) {
    let area = length * width;
    console.log("The area of the rectangle is: " + area);
}
areaOfRectangle(5, 3);
areaOfRectangle(10, 4);

// 9 Write a function that returns "Adult" if age ≥ 18 else "Minor".
function isAdult(age) {
    if (age >= 18) {
        return "Adult";    
    } else {
        return "Minor";
    }
}

console.log(isAdult(20)); // Output: "Adult"
console.log(isAdult(15)); // Output: "Minor"

// 10. Create a function to reverse a string.
function reverseString(str) {
    let reversed = "";
    for (let i = str.length -1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
console.log(reverseString("Dollar")); // Output: "relluD"
console.log(reverseString("JavaScript")); // Output: "tpircSavaJ"