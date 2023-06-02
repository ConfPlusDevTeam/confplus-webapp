// //get institutions
// import fs from "fs-extra";
// import path from "path";

import { Prisma } from "@prisma/client"
const prisma = new Prisma()

export default class InstituionsRepo {
  constructor() {
    // this.path = path.join(process.cwd(), "app/data/institutions.json");
  }
  async getInstitutions() {
    // return JSON.parse(await fs.readFile(this.path));
    return await prisma.institutions.findMany()
  }
}
