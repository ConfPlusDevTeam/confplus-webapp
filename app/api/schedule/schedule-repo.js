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

  async getScheduleDates() {
    return await prisma.scheduleDate.findMany( {
      include: {
        sessions: {
          include: {
            sessionPapers: {
              include: { paper: { include: { presenter: true } } },
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

  async getScheduleDate(date) {
    return await prisma.scheduleDate.findUnique({
      where: { date: new Date(date).toISOString() },
      include: {
        sessions: {
          include: {
            sessionPapers: {
              include: { paper: { include: { presenter: true } } },
            },
          },
        },
      },
    });
  }

  async addSession(date, session) {
    return await prisma.session.create({
      data: {
        ...session,
        scheduleDate: { connect: { date: new Date(date).toISOString() } },
      },
    });
  }
}
