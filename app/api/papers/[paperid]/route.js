import PapersRepo from "../papers-repo";
const papersRepo = new PapersRepo();

export async function GET (request, {params}){
    const {paperid} = params;
    if (paperid ) return Response.json(await papersRepo.getPaperById(paperid), { status: 200 })
    else return Response.json({ message: "Invalid request" }, { status: 400 })
}
