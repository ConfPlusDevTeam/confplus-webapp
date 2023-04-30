//get schedule
//post schedule
import fs from "fs-extra";
import path from "path";

export default class ScheduleRepo {
    constructor() {
        this.path = path.join(process.cwd(), "app/data/schedule.json");
    }
    async getSchedule () {
        const schedule = JSON.parse(await fs.readFile(this.path));
        return schedule;
    }
    // async addScheduleItem (session) {
    //     const allSessions = await this.getSchedule();

    //     const matchingSession = allSessions.find(item => item.date === session.date);
    //     if (matchingSession) {
    //         matchingSession.presentations = session.presentations;
    //     }
    //     else {
    //         allSessions.push(session);
    //     }

    //     await fs.writeFile(this.path, JSON.stringify(allSessions));
    //     return session;

    // }
    async updateSchedule (schedule) {
        await fs.writeFile(this.path, JSON.stringify(schedule));
        const dates = schedule.map(item => item.name);
        await fs.writeFile(path.join(process.cwd(), "app/data/conference-dates.json"), JSON.stringify(dates));
        return schedule;
    }


    async getScheduleDates () {
        return JSON.parse(await fs.readFile(path.join(process.cwd(), "app/data/conference-dates.json")));
    }
    async getScheduleItem (name) {
        const schedule = JSON.parse(await fs.readFile(this.path))
        return schedule.find(item => item.name === name)
    }
}   