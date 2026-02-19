import type { ILogin, IUser } from './interface.js';
// con questa riga di codice importiamo l'interfaccia ILogin
// definita nel file interface.ts

interface IAddress {
    street: string;
    city: string;
    state: string;
    pin: string;
}

class Employee implements ILogin {
    // # rende la proprietà privata
    #id: number;
    // quando la proprietà è protected significa che è accessibile
    // solo all'interno della classe e delle classi derivate
    // e non é accessibile dall'instanza della classe
    protected name: string
    address: IAddress;

    get getId(): number {
        return this.#id;
    }

    set setId(id: number) {
        this.#id = id;
    }

    // NOTA: non di possono avere piu di un costruttore
    constructor(id: number, name: string, address: IAddress) {
        this.#id = id;
        this.name = name;
        this.address = address;
    }

    getNameAndAddress(): string {
        return `${this.name} live in ${this.address}`;
    }

    // se una funzione è statica
    // significa che può essere chiamata senza creare un'istanza della classe
    static getCompanyName(): string {
        return "ACME Corp";
    }

    login(): IUser {
        return {id: 1, name: "John Doe", email: ""};
    }

}

class Manager extends Employee {
    constructor(id: number, name: string, address: IAddress) {
        super(id, name, address);
    }

    getNameAndAddress(): string {
        return `Manager: ${this.name} live in ${this.address}`;
    }
}

let john = new Employee(1, "John Doe", { 
    street: "123 Main St", 
    city: "Anytown", 
    state: "CA", 
    pin: "12345" 
});
let manager = new Manager(2, "Jane Smith", { 
    street: "456 Oak Ave", 
    city: "Anytown", 
    state: "CA", 
    pin: "12345" 
});
let info = manager.getNameAndAddress();
john.setId = 10;


// console.log(john);
// console.log(`Id: ${john.getId}`);
// console.log(john.getNameAndAddress());
// console.log(info);
// console.log(Employee.getCompanyName());
console.log(john.login());