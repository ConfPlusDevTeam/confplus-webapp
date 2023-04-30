//get - returns the schedule
//post - adds a new schedule item

import ScheduleRepo from "./schedule-repo";
const scheduleRepo = new ScheduleRepo();

export async function GET(request, { params }) {
    try {
        const schedule = await scheduleRepo.getSchedule();
        return Response.json(schedule, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        const schedule = await request.json();
        if (!schedule) {
            return Response.json({ message: "Bad request" }, { status: 400 });
        }
        const scheduleResponse = await scheduleRepo.updateSchedule(schedule);

        return Response.json(scheduleResponse, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}


