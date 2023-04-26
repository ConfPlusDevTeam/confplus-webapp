//getUsers() -> returns an array of all users from users.json
//getUsersByRole(Role) -> an array of all users that are of that role - publishers, reviewer...
//validateUser (email, password) -> returns the user if the email and password match, otherwise returns null

const fs = require('fs');
const usersPath = '../data/users.json';

export const getUsers = () => {
    return JSON.parse(fs.readFile(usersPath));
}

export const getUsersByRole = (role) => {
    return getUsers().filter(user => user.role === role);
}

export const validateUser = (email, password) => {
    return getUsers().find(user => user.email === email && user.password === password);
}





