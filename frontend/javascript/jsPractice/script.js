// Question 1 (Easy) — Find Expensive Products
let arr = [100, 250, 500, 150, 700];

let filteredArr = arr.filter((value) => value > 300);

console.log(filteredArr); // Output: [500, 700]

// Question 2 (Moderate) — Student Average
let marks =  [80, 90, 70, 85, 95];
let average = marks.reduce((acc, mark) => acc + mark, 0) / marks.length;

console.log(average); // Output: 84

// Question 3 (Hard) — Most Frequent Number
let num = [1,2,3,2,4,2,5,1,1,1];
let numFrequency = {};

for (let i = 0; i < num.length; i++) {
    let number = num[i];
    if (numFrequency[number]) {
        numFrequency[number]++;
    } else {
        numFrequency[number] = 1;
    }
}

let mostFrequentNum = null;
let maxFrequency = 0;
for (let key in numFrequency) {
    if (numFrequency[key] > 1 && numFrequency[key] > maxFrequency) {
        maxFrequency = numFrequency[key];
        mostFrequentNum = parseInt(key);
    }
}

console.log(mostFrequentNum); // Output: 1
console.log(numFrequency); // Output: { '1': 4, '2': 3, '3': 1, '4': 1, '5': 1 }