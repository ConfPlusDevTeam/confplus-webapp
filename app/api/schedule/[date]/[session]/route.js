// /[date]/[id] 
// GET gets a specific session + session papers
// POST posts a sessionpapeer
// DELETE deletes the session and everything inside it
// UPDATE updates the session
import ScheduleRepo from "app/api/schedule/schedule-repo.js";
const scheduleRepo = new ScheduleRepo();

export async function GET(request, { params }) {
    try {
        const session = await scheduleRepo.getSesssion(params.session);
        if (!session)
            return Response.json({ message: "Invalid session" }, { status: 400 });
        return Response.json(session, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try{
        const paper = await request.json()
        const session = await scheduleRepo.addSessionPaper(params.session, paper.paperId);
        if (!session)
            return Response.json({ message: "Invalid session or date" }, { status: 400 });
        return Response.json(session, { status: 200 });
    }
    catch(e){
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await scheduleRepo.deleteSession(params.session);
        if (!session)
            return Response.json({ message: "Invalid session" }, { status: 400 });
        return Response.json(session, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const session = await request.json()
        const updatedSession = await scheduleRepo.updateSession(params.session, session);
        if (!updatedSession)
            return Response.json({ message: "Invalid session" }, { status: 400 });
        return Response.json(updatedSession, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}