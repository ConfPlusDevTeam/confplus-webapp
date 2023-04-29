//post - accepts a paper object to be assigned 2 random reviewrs and saved in `papers.json`.

import PapersRepo from "./papers-repo";
const papersRepo = new PapersRepo();

export async function POST(request, { params }) {
    try {
        const paper = await request.json();

        if (!paper) return Response.json({ message: "Bad request" }, { status: 400 });


        const response = await papersRepo.addPaper(paper);

        return Response.json(paper, { status: 200 });

    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

//get - accepts an email and returns all papers assigned to that reviewer.
export async function GET(request, { params }) {
    try {
        const reviewer = new URL(request.url).searchParams.get("reviewer");
        if (!reviewer) {
            return Response.json({ message: "Bad request" }, { status: 400 });
        }
        const papers = await papersRepo.getPapersForReviewer(reviewer);
        return Response.json(papers, { status: 200 });
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}

