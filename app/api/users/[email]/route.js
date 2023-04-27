//get user - validate user
import UsersRepo from "../users-repo";
const repo = new UsersRepo();

export async function GET(request, { params }) {
  const { email } = params;
  return Response.json(email);
}
