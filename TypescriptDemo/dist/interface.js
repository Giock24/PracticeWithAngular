let user = {
    id: 1,
    name: "John Doe",
    email: ""
};
let admin = {
    id: 2,
    name: "Jane Smith",
    email: "",
    role: "superadmin"
};
// come destrutturizzare un'oggetto
// name diventa userName
// email diventa userLogin
let { name: userName, email: userLogin } = {
    id: 1,
    name: "test",
    email: "test"
};
// console.log(userName);
// console.log(userLogin);
// esempio di destrutturizzazione di array
let [user1, user2, ...restUsers] = [
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
export {};
