//post - accepts a paper object to be assigned 2 random reviewrs and saved in `papers.json`.

import * as repo from "./papers-repo.js";

export async function POST(request, { params }) {
  try {
    const paper = await request.json();
    const authorIDs = paper.authorIDs;
    delete paper.authorIDs;
    if (!paper || !authorIDs)
      return Response.json({ message: "Bad request" }, { status: 400 });

    const response = await repo.addPaper(authorIDs, paper);
    return Response.json(paper, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

//get - accepts an email and returns all papers assigned to that reviewer.
export async function GET(request, { params }) {
  try {
    const reviewer = new URL(request.url).searchParams.get("reviewer");
    const author = new URL(request.url).searchParams.get("author");
    if (!reviewer) {
      if (author) {
        const papers = await papersRepo.getPapersForAuthor(author);
        return Response.json(papers, { status: 200 });
      }
      return Response.json({ message: "Bad request" }, { status: 400 });
    }
    const papers = await papersRepo.getPapersForReviewer(reviewer);
    return Response.json(papers, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
