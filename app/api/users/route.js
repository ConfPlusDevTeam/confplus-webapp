//get users - returns all users if no query string parameters are passed else return users matching query of role type
import UsersRepo from "./users-repo";
const repo = new UsersRepo();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  if (role) {
    return Response.json(await repo.getUsersByRole(role));
  }
  return Response.json(await repo.getUsers());
}
