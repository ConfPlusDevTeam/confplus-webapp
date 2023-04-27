const fs = require('fs').promises;

const path = "app/data/users.json";

async function getUsers() {
    return JSON.parse(await fs.readFile(path));
}

async function getUsersByRole(role) {
    const users = await getUsers();
    return users.filter(user => user.role === role);
}

async function validateUser(email, password) {
    const users = await getUsers();
    return users.find(user => user.email === email && user.password === password);
}

console.log(getUsers());