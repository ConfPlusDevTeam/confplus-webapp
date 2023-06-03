//GET - returns all papers accosiated with author filtered by status
import UsersRepo from "app/api/users/users-repo";
const repo = new UsersRepo();

export async function GET (request, {params}){
    const status = new URL(request.url).searchParams.get("status");
    const {id} = params;
    console.log(id)
    console.log(status)
    if (id && (status === 'Pending' || status === 'Rejected' || status === 'Accepted')) return Response.json(await repo.getPapersByAuthorId(id, status), { status: 200 })
    else return Response.json({ message: "Invalid request" }, { status: 400 })
}