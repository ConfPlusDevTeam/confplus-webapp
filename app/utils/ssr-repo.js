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

    // averageconfpresen(){returns number of total sessions (sum of all day sessions) , average papers in a session)
    // async scheduleInfo () {
    //     const totalSessions = await prisma.session.count()
    //     const averagePapers = await prisma.$queryRaw`SELECT AVG(ARRAY_LENGTH(papers, 1)) FROM "Session"`
    //     const averagePapersInSession = await prisma.s
    //     return {totalSessions, averagePapers}
    // }
}
