let lname;
lname = "Consoli";
lname = lname.toUpperCase();
console.log(lname);
let age;
age = 30;
age = age + 1;
let isValid = true;
let empList;
empList = ["Mario", "Luigi", "Peach"];
let numList;
numList = [10, 20, 30, 40];
let result = numList.filter((num) => num > 20);
let num = numList.find((num) => num === 30);
let sum = numList.reduce((acc, curr) => acc + curr, 0);
console.log(result);
console.log(num);
console.log(sum);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let c = Color.Green;
let tupleVar;
function swap(num1, num2) {
    return [num2, num1];
}
tupleVar = swap(5, 10);
console.log(tupleVar);
let department;
department = "IT";
department = 101;
export {};
