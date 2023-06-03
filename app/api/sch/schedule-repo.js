import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class ScheduleRepo{
    constructor(){}
    async getSchedule(){
        return await prisma.schedule.findMany({include: schedule})
    }
   
}