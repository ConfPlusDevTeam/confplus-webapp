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
    async addScheduleItem (scheduleItem) {
        const schedule = JSON.parse(await fs.readFile(this.path))
        schedule.push(scheduleItem)
        await fs.writeFile(this.path, JSON.stringify(schedule))
        return scheduleItem
    }
    async getScheduleDates () {
        return JSON.parse(await fs.readFile(path.join(process.cwd(), "app/data/conference-dates.json")));
    }
    async getScheduleItem (date) {
        const schedule = JSON.parse(await fs.readFile(this.path))
        return schedule.find(item => item.date === date)
    }
}   