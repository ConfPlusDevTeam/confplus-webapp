//get users - returns all users if no query string parameters are passed else return users matching query of role type
import UsersRepo from "./users-repo";
const repo = new UsersRepo();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
    try{
        if (role) {
            if (role !== "reviewer" || role !== "author" || role !== "organizers") 
                return Response.json(await repo.getUsersByRole(role), { status: 200 });
            else 
                return Response.json({ message: "Invalid role" }, { status: 400 });
        }
        return Response.json(await repo.getUsers());
    } catch (e) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
