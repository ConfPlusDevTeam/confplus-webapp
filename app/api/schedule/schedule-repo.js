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
    date = new Date(date).toISOString()
    return await prisma.session.create({
      data: {
        ...session,
        date
      },
    });
  }

  async updateSession(id, session) {
    return await prisma.session.update({
      where: { id },
      data: session,
    });
  }

  async deleteScheduleDate(date) {
    return await prisma.scheduleDate.delete({
      where: { date: new Date(date).toISOString() },
    });
  }

  async getSesssion(id) {
    return await prisma.session.findUnique({
      where: { id },
      include: {
        sessionPapers: {
          include: { paper: { include: { presenter: true } } },
        },
      },
    });
  }
}