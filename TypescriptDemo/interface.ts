export interface IUser {
    id: number;
    name: string;
    age?: number;
    email: string;
}

let user: IUser = {
    id: 1,
    name: "John Doe",
    email: ""
};

// se un'interfaccia estende un'altra interfaccia
// eredita tutte le proprietà dell'interfaccia padre
interface IAdmin extends IUser {
    role: string;
}

let admin: IAdmin = {
    id: 2,  
    name: "Jane Smith",
    email: "",
    role: "superadmin"
};

// console.log(user);
// console.log(admin);

// se una mette la keyword "export"
// significa che quella parte di codice
// può essere importata in altri file
export interface ILogin {
    login(): IUser;
}

// come destrutturizzare un'oggetto
// name diventa userName
// email diventa userLogin
let { name : userName, email : userLogin }: IUser = {
    id: 1,
    name: "test",
    email: "test"
};
// console.log(userName);
// console.log(userLogin);

// esempio di destrutturizzazione di array
let [user1, user2, ...restUsers]: IUser[] = [
    { id: 1, name: "User 1", email: "" },
    { id: 2, name: "User 2", email: "" },
    { id: 3, name: "User 3", email: "" },
    { id: 4, name: "User 4", email: "" }
];

// console.log(user1);
// console.log(user2);
// console.log(restUsers);

let result = restUsers.filter(user => user.id > 3);
console.log(result);