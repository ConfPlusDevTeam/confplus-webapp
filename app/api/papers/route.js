//post - accepts a paper object to be assigned 2 random reviewrs and saved in `papers.json`.

import PapersRepo from "./papers-repo";
const papersRepo = new PapersRepo();

export async function POST(request, { params }) {
    try {
        if (!request.body) {
            return Response.json({ message: "Bad request" }, { status: 400 });
        }
        const paper = await papersRepo.addPaper(request.body);
        return Response.json(paper, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
