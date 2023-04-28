//gets conference dates
import ScheduleRepo from "../schedule-repo";
const scheduleRepo = new ScheduleRepo();

export async function GET(request, { params }){
    try{
        const scheduleDates = await scheduleRepo.getScheduleDates();
        return Response.json(scheduleDates, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}