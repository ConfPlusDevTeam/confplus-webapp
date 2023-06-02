// import fs from "fs-extra";
// import { nanoid } from "nanoid";
// import path from "path";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UsersRepo {
  constructor() {
    // this.path = path.join(process.cwd(), "app/data/users.json");
  }
  async getUsers() {
    // return JSON.parse(await fs.readFile(this.path));
    return await prisma.users.findMany();
  }

  async getUsersByRole(role) {
    // return (await this.getUsers()).filter((user) => user.role === role);
    return await prisma.users.findMany({ where: { role: role } });  
  }

  async validateUser(email, password) {
    // return (await this.getUsers()).find(
    //   (user) => user.email === email && user.password === password
    // );
    return await prisma.users.findFirst({ where: { email: email, password: password } });
  }

  async getPapersByAuthorId(authorId, status) {
    // return await prisma.papers.findMany({ where: { PaperAuthors: { some: { userId: authorId } }, {status: status} } });
    return await prisma.papers.findMany({ where: { PaperAuthors: { some: { userId: authorId } }, status: status } });
  }
}
