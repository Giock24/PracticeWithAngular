// il tipo di dato (number) che uno mette dopo le parantesi tonde
// serve per evitare che la funzione ritorni un valore di tipo diverso
// infatti se uno levasse sia il tipo di dato che il return
// diventerebbe una funzione che ritorna void (nulla)

// primo modo per scrivere una funzione
// function declaration
// num3 è un optional parameter
function add(num1: number, num2: number, num3?: number) : number{
    // sta a dire se num3 esiste fai la somma di tutti e tre
    // altrimenti fai la somma dei primi due
    return num3? num1 + num2 + num3 : num1 + num2;
}

console.log(add(5, 10));

console.log(add(5, 10, 15));

// secondo modo per scrivere una funzione
// arrow function
// num3 è un required parameter con valore di default 10
const sub = (num1: number, num2: number, num3 = 10) : number => num1 - num2 - num3;

console.log(sub(10, 5));

console.log(sub(20, 5, 2));

// terzo modo per scrivere una funzione
// function expression
const mult = function(num1: number, num2: number) : number {
    return num1 * num2;
}

console.log(mult(5, 10));

// esempio di uso: rest parameter
function sumAll(num1: number, num2: number, ...numRest: number[]) : number {
    return num1 + num2 + numRest.reduce((a, b) => a + b, 0);
}

let numbers = [5, 10, 15, 20, 25];
console.log(sumAll(1,2, ...numbers));
// stesso modo
console.log(sumAll(1,2,5,10,15,20,25));

function getItems<Type>(items: Type[]): Type[] {
    return new Array<Type>().concat(items);
}

let concatNumbers = getItems<number>([1,2,3,4,5]);
let concatStrings = getItems<string>(["Mario", "Luigi", "Peach"]);