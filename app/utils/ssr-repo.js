import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class ssrRepo {
    constructor() {}
    async getPapersCount (status) {
        if (status === 'Accepted' || status === 'Rejected' || status === 'Pending') return await prisma.paper.count ({ where: { status }})
        else return await prisma.paper.count()
    }

    async averageAuthorsinPapers () {
        const totalAuthors = await prisma.paperAuthors.count()
        const totalPapers = await prisma.paper.count()
        return totalAuthors/totalPapers
    }

    async getSessionsCount () {
        return await prisma.session.count()
    }

    async averagePresentationsinSessions () {
        const totalPresentations = await prisma.SessionPaper.count()
        const totalSessions = await prisma.session.count()
        return totalPresentations/totalSessions
    }
}
