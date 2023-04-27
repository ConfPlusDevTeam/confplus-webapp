const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../../data/users.json');

const getUsers = () => {
    return JSON.parse(fs.readFileSync(usersPath));
}

const getUsersByRole = (role) => {
    return getUsers().filter(user => user.role === role);
}

const validateUser = (email, password) => {
    return getUsers().find(user => user.email === email && user.password === password);
}

module.exports = {
  getUsers,
  getUsersByRole,
  validateUser
}

console.log(getUsersByRole('author'));