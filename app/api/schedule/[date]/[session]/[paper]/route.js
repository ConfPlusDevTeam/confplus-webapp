// /[date]/[id]/[paper]
// GET gets a specific paper - if its to be presented on that date and session
// DELETE delete the session paper

import ScheduleRepo from "app/api/schedule/schedule-repo.js";
const scheduleRepo = new ScheduleRepo();

export async function GET(request, { params }) {
    try {
        const paper = await scheduleRepo.getSessionPaper(params.session, params.paper);
        if (!paper)
            return Response.json({ message: "Invalid session or paper" }, { status: 400 });
        return Response.json(paper, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const paper = await scheduleRepo.deleteSessionPaper(params.session, params.paper);
        if (!paper)
            return Response.json({ message: "Invalid session or paper" }, { status: 400 });
        return Response.json(paper, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}