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

export async function POST(request, { params }) {
    try {
        const session = await request.json();
        
        if (!session) {
            return Response.json({ message: "Invalid session" }, { status: 400 });
        }
        const Res = await scheduleRepo.addSession(params.date, session);
        if (!Res)
            return Response.json({ message: "Invalid session or date" }, { status: 400 });
        return Response.json(Res, { status: 201 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }){
    try {
        const date = params.date;
        const Res = await scheduleRepo.deleteScheduleDate(date);
        if (!Res)
            return Response.json({ message: "Invalid date" }, { status: 400 });
        return Response.json(Res, { status: 201 });
    }
    catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
