import fs from "fs-extra";
import { nanoid } from "nanoid";
import path from "path";

export default class UsersRepo {
  constructor() {
    this.path = path.join(process.cwd(), "app/data/users.json");
  }
  async getUsers() {
    return JSON.parse(await fs.readFile(this.path));
  }

  async getUsersByRole(role) {
    return (await this.getUsers()).filter((user) => user.role === role);
  }

  async validateUser(email, password) {
    return (await this.getUsers()).find(
      (user) => user.email === email && user.password === password
    );
  }
}
