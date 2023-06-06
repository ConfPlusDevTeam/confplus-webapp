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


  //not working properly
  async updateSession(id, session) {
    console.log(id, session)
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

  async deleteSession(id) {
    return await prisma.session.delete({
      where: { id: Number(id) },
    });
  }

  async getSesssion(id) {
    return await prisma.session.findUnique({
      where: { id: Number(id) },
      include: {
        sessionPapers: {
          include: { paper: { include: { presenter: true } } },
        },
      },
    });
  }

  async addSessionPaper(sessionId, paperId) {
    return await prisma.sessionPaper.create({
      data: { sessionId: Number(sessionId), paperId: Number(paperId) },
    });
  }

  async getSessionPaper(sessionId, paperId) {
    return await prisma.sessionPaper.findUnique({
      where: { sessionId_paperId: { sessionId: Number(sessionId), paperId: Number(paperId) } },
      include: { paper: { include: { presenter: true } } },
    });
  }

  async deleteSessionPaper(sessionId, paperId) {
    return await prisma.sessionPaper.delete({
      where: { sessionId_paperId: { sessionId: Number(sessionId), paperId: Number(paperId) } },
    });
  }


}