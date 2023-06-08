import * as papersRepo from "../papers-repo";

//get accepted papers
export async function GET(request, { params }) {
  try {
    const papers = await papersRepo.getAcceptedPapers();
    return Response.json(papers, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
