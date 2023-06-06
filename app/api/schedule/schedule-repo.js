import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class ScheduleRepo {
  constructor() {}
  async getSchedule() {
    return await prisma.schedule.findMany({
      include: {
        scheduleDates: {
          include: {
            sessions: {
              include: {
                sessionPapers: {
                  include: { paper: { include: { presenter: true } } },
                },
              },
            },
          },
        },
      },
    });
  }

  async addScheduleDate(date) {
    return await prisma.scheduleDate.create({
      data: { date: new Date(date).toISOString(), scheduleId: 1 },
    });
  }
}
