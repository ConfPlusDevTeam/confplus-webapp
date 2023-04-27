import {promises as fs} from 'fs';

const path = "app/data/users.json";

export async function getUsers() {
    return JSON.parse(await fs.readFile(path));
}

export async function getUsersByRole(role) {
    return getUsers().filter(user => user.role === role);
}

export async function validateUser(email, password) {
    return getUsers().find(user => user.email === email && user.password === password);
}


console.log(getUsers());