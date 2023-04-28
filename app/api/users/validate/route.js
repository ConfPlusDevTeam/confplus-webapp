//get user - validate user
import UsersRepo from "../users-repo";
const repo = new UsersRepo();

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const email = body.email.toLowerCase();
    const password = body.password;

    const user = await repo.validateUser(email, password);
    if (user) {
      return Response.json(user, { status: 200 });
    } else {
      return Response.json({ message: "Invalid credentials" }, { status: 400 });
    }
  } catch (e) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
