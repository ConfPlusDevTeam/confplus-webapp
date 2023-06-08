//get - returns the schedule
//post - adds a new schedule item

import ScheduleRepo from "./schedule-repo";
const scheduleRepo = new ScheduleRepo();

export async function GET(request) {
  try {
    const schedule = await scheduleRepo.getSchedule();
    return Response.json(schedule, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const scheduleDate = await request.json();
    if (!scheduleDate.date) {
      return Response.json({ message: "Bad request" }, { status: 400 });
    }
    const scheduleResponse = await scheduleRepo.addScheduleDate(
      scheduleDate.date
    );

    return Response.json(scheduleResponse, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
