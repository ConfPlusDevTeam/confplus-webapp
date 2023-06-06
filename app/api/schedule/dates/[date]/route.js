import ScheduleRepo from "app/api/schedule/schedule-repo.js";
const scheduleRepo = new ScheduleRepo();

export async function GET(request, { params }) {
    try {
        const scheduleDates = await scheduleRepo.getScheduleDate(params.date);
        return Response.json(scheduleDates, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}