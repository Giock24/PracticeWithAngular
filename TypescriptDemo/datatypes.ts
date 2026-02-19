let lname : string;

lname = "Consoli";
lname = lname.toUpperCase();

console.log(lname);

let age : number;

age = 30;
age = age + 1;

let isValid: boolean = true;

let empList : string[];

empList = ["Mario", "Luigi", "Peach"];

let numList : Array<number>;

numList = [10, 20, 30, 40];

let result = numList.filter((num) => num > 20);

let num = numList.find((num) => num === 30);

let sum = numList.reduce((acc, curr) => acc + curr, 0);

console.log(result);
console.log(num);
console.log(sum);

const enum Color {
    Red,
    Green,
    Blue
}

let c: Color = Color.Green;

let tupleVar: [number, number];
    
function swap(num1: number, num2: number): [number, number] {
    return [num2, num1];
}

tupleVar = swap(5, 10);

console.log(tupleVar);


let department: any;
department = "IT";
department = 101;

