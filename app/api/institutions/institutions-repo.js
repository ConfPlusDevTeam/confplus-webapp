
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class InstituionsRepo {
  constructor() {
  }
  async getInstitutions() {
    return await prisma.institution.findMany()
  }
}
