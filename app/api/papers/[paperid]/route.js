import * as papersRepo from "../papers-repo";

export async function GET(request, { params }) {
  const { paperid } = params;
  if (paperid)
    return Response.json(await papersRepo.getPaperById(paperid), {
      status: 200,
    });
  else return Response.json({ message: "Invalid request" }, { status: 400 });
}

export async function DELETE(request, { params }) {
  try {
    const { paperid } = params;
    const paper = await papersRepo.deletePaper(paperid);
    return Response.json(paper, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
